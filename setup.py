# -----------------------------------------------------------------------------
#         cppad_py: A C++ Object Library and Python Interface to Cppad
#          Copyright (C) 2017-20 Bradley M. Bell (bradbell@seanet.com)
#              This program is distributed under the terms of the
#              GNU General Public License version 3.0 or later see
#                    https://www.gnu.org/licenses/gpl-3.0.txt
# -----------------------------------------------------------------------------
# extra flags to supress wanings in swig code
import glob
import re
import os
import sys
import subprocess
import shutil
from setuptools import setup, Extension
def sys_exit(msg) :
	sys.exit( 'setup.py: ' + msg )
src_distribution = 'sdist' in sys.argv
# Examples and tests are not included in pip distribution
pip_distribution = not os.path.isfile( 'example/python/check_all.py.in' )
# -----------------------------------------------------------------------------
# CMakeLists.txt settings
#
# cppad_py_version
fp      = open('CMakeLists.txt', 'r')
string  = fp.read()
pattern = '\\nSET\( *cppad_py_version  *"([0-9]{4}[.][0-9]+[.][.0-9]*)"'
match   = re.search(pattern, string)
if not match :
	sys_exit('cannot find cppad_py version in CMakeLists.txt')
cppad_py_version = match.group(1)
fp.close()
# -----------------------------------------------------------------------------
# bin/get_cppad.sh settings
#
fp      = open('bin/get_cppad.sh', 'r')
string  = fp.read()
#
# extra_cxx_flags
pattern = r"\nextra_cxx_flags='([^']*)'"
match   = re.search(pattern, string)
if not match :
	sys_exit('cannot find extra_cxx_flags in bin/get_cppad.sh')
extra_cxx_flags = match.group(1)
#
# cppad_prefix
pattern = '''\ncppad_prefix=['"]([^'"]*)['"]'''
match   = re.search(pattern, string)
if not match :
	sys_exit('cannot find cppad_prefix in bin/get_cppad.sh')
cppad_prefix = match.group(1)
#
# build_type
pattern = r"\nbuild_type='([^']*)'"
match   = re.search(pattern, string)
if not match :
	sys_exit('cannot find build_type in bin/get_cppad.sh')
build_type = match.group(1)
if build_type != 'debug' and build_type != 'release' :
	sys_exit('build_type is not debug or release in bin/get_cppad.sh')
# -----------------------------------------------------------------------------
# check for $HOME in cppad_prefix
index = cppad_prefix.find('$HOME')
if index >= 0 :
	cppad_prefix = cppad_prefix.replace( '$HOME', os.environ['HOME'] )
# -----------------------------------------------------------------------------
# check if we need to install a local copy of cppad
cppad_include_file = cppad_prefix + '/include/cppad/cppad.hpp'
flag = 0
if not os.path.isfile( cppad_include_file ) :
	command = [ 'bin/get_cppad.sh' ]
	flag = subprocess.call(command)
if flag != 0 or not os.path.isfile( cppad_include_file ) :
	msg  = 'Cannot find ' + cppad_include_file + '\n'
	msg += 'and bin/get_cppad.sh could not create it.'
	sys_exit(msg)
# -----------------------------------------------------------------------------
def quote_str(s) :
	return "'" + s + "'"
# -----------------------------------------------------------------------------
# Use swig directly (instead of through setup which seems to have trouble).
# This creates the files cppad_py_swig_wrap.cpp and swig.py in the
# lib/python/cppad_py directory.
command = [
	'swig',
	'-c++',
	'-python',
	'-I./include',
	'-o', 'lib/python/cppad_py/cppad_py_swig_wrap.cpp',
	'lib/cppad_py_swig.i'
]
flag    = subprocess.call(command)
if flag != 0 :
	sys_exit('swig command failed')
else :
	print('swig command OK')
# -----------------------------------------------------------------------------
# Run cmake to configure C++ library for testing,
if pip_distribution :
	# Only using cmake to determine if -stdlib=libc++ is available
	# and the location of the cppad_lib library
	# so remove all SUB_DIRECTORY commands in CMakeLists.txt
	fp      = open('CMakeLists.txt', 'r')
	fp_data = fp.read()
	fp.close()
	pattern = r'\n(ADD_SUBDIRECTORY\([^(]*\))'
	fp_data = re.sub(pattern, r'\n# \1', fp_data)
	pattern = r'FATAL_ERROR ("no correctnes checks are available")'
	fp_data = re.sub(pattern, r'STATUS \1', fp_data)
	#
	fp      = open('CMakeLists.txt', 'w')
	fp.write(fp_data)
	fp.close()

if not os.path.isdir('build') :
	os.mkdir('build')
os.chdir('build')
if os.path.isfile( 'CMakeCache.txt' ) :
	os.remove('CMakeCache.txt')
command = [
	"cmake",
	"-D", "CMAKE_BUILD_TYPE=" + build_type,
	"-D", "cppad_prefix="     + cppad_prefix,
	"-D", "extra_cxx_flags="  + extra_cxx_flags,
	".."
]
try :
	output = subprocess.check_output(command, stderr=subprocess.STDOUT)
except subprocess.CalledProcessError as process_error:
	output = str(process_error.output, 'utf-8')
	print(output)
	sys_exit('cmake command failed')
else :
	print('cmake command OK')
output = str(output, 'utf-8')
#
# cxx_has_stdlib
print(output)
if output.find('cxx_has_stdlib = "true"') != -1 :
	cxx_has_stdlib = True
elif output.find('cxx_has_stdlib = "false"') != -1 :
	cxx_has_stdlib = False
else :
	sys_exit('cannot find cxx_has_stdlib value in cmake output')
#
# cppad_lib_dir
pattern = r'cppad_lib_path = "([^"]*)"'
match   = re.search(pattern, output)
if match == None :
	sys_exit('cannot find cppad_lib_path value in cmake output')
cppad_lib_path = match.group(1)
index          = cppad_lib_path.rfind('/')
cppad_lib_dir  = cppad_lib_path[ : index ]
#
os.chdir('..')
# -----------------------------------------------------------------------------
# extension_sources
# Note that cppad_py_swig_wrap.cpp is not really a source file and
# is overwritten by the swig command above.
cppad_py_extension_sources = [ 'lib/python/cppad_py/cppad_py_swig_wrap.cpp' ]
for name in os.listdir('lib/cplusplus') :
	if name.endswith('.cpp') :
		cppad_py_extension_sources.append( 'lib/cplusplus/' + name)
# -----------------------------------------------------------------------------
# extension_module
include_dirs     = [ cppad_prefix + '/include', 'include' ]
extra_compile_args  = extra_cxx_flags.split()
if cxx_has_stdlib :
	extra_link_args = ['-stdlib=libc++' ]
	extra_compile_args.append('-stdlib=libc++')
else :
	extra_link_args = list()
undef_macros        = list()
if build_type == 'debug' :
	extra_compile_args.append( '-O0' )
	extra_compile_args.append( '-g')
	undef_macros = [ 'NDEBUG', '_FORTIFY_SOURCE' ]
#
cppad_py_extension_name   = 'cppad_py/_swig'
extension_module          = Extension(
	cppad_py_extension_name                               ,
	cppad_py_extension_sources                            ,
	include_dirs       = include_dirs                     ,
	extra_compile_args = extra_compile_args               ,
	undef_macros       = undef_macros                     ,
	extra_link_args    = extra_link_args                  ,
	library_dirs       = [ cppad_lib_dir ]                ,
	libraries          = [ 'cppad_lib' ]                  ,
)
# -----------------------------------------------------------------------------
# setup
setup_result = setup(
	name         = 'cppad_py',
	version      = cppad_py_version,
	license      = 'GPL3',
	description  = 'A C++ Object Library and Python Interface to CppAD',
	author       = 'Bradley M. Bell',
	author_email = 'bradbell@seanet.com',
	url          = 'https://github.com/bradbell/cppad_py',
	ext_modules  = [ extension_module ],
	packages     = [ 'cppad_py' ],
	package_dir  = { 'cppad_py' : 'lib/python/cppad_py' },
)
# ---------------------------------------------------------------------------
if not (pip_distribution or src_distribution) :
	# -----------------------------------------------------------------------
	# in example/python use check_all.py.in to create check_all.py
	# (this is used for local testing)
	top_srcdir  = os.getcwd()
	sed_cmd     = 's|@CMAKE_SOURCE_DIR@|' + top_srcdir + '|'
	sed_in      = open('example/python/check_all.py.in', 'r')
	sed_out     = open('example/python/check_all.py',    'w')
	command = [ 'sed', '-e', sed_cmd ]
	flag = subprocess.call(command, stdin=sed_in, stdout=sed_out )
	if flag != 0 :
		sys_exit('failed to create example/python/check_all.py')
	# -----------------------------------------------------------------------
	# create the directory ./cppad_py for testing purposes
	#
	# initialize cppad_py directory as a copy of lib/python/cppad_py
	if os.path.exists('cppad_py') :
		shutil.rmtree('cppad_py')
	shutil.copytree('lib/python/cppad_py', 'cppad_py');
	#
	# python_version
	python_major_version = sys.version_info.major
	python_minor_version = sys.version_info.minor
	if python_major_version != 2 and python_major_version != 3 :
		msg  = 'python major version number '
		msg += str( python_major_version ) + ' is not 2 or 3'
		sys_exit(msg)
	#
	# cppad_py/python_version
	python_version = str(python_major_version) +"."+ str(python_minor_version)
	file_ptr = open('cppad_py/python_version', 'w')
	file_ptr.write(python_version + '\n')
	file_ptr.close()
	#
	# copy swig extension library to cppad_py
	count = 0
	for dname in os.listdir('build') :
		if dname.startswith('lib.') and dname.endswith('-' + python_version):
			for fname in os.listdir('build/' + dname + '/cppad_py' ) :
				if fname.startswith('_swig.') :
					src_file = 'build/' + dname + '/cppad_py/' + fname
					dst_file = 'cppad_py/' + fname
					shutil.copyfile(src_file, dst_file)
					shutil.copymode(src_file, dst_file)
					count = count + 1
	if count != 1 :
		msg ='could not find swig library to copy for testing'
		sys_exit(msg)
# -----------------------------------------------------------------------------
print('If you get a message that the CppAD object library is missing, try:')
print('    export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:' + cppad_lib_dir )
print('setup.py: OK')
sys.exit(0)
# -----------------------------------------------------------------------------
# $begin setup.py$$ $newlinech #$$
# $spell
#	makefile
#	cxx
#	undef
#	https://github.com/bradbell/cppad_py.git
#	srcdir
#	cplusplus
#	python python
#	cmake
#	sys
#	pypi.org
# $$
#
# $section Configure and Build the cppad_py Python Module$$
#
# $head Syntax$$
# $codei%python setup.py build_ext
# %$$
#
# $head External Requirements$$
# $list number$$
# $href%https://www.python.org/%python%$$ version 3.
# $lnext
# $href%https://en.wikipedia.org/wiki/Bash_(Unix_shell)%bash%$$
# $lnext
# $href%https://en.wikipedia.org/wiki/C++%c++%$$.
# $lnext
# $href%https://cmake.org%cmake%$$
# $lnext
# $href%https://git-scm.com/%git%$$.
# $lnext
# $href%http://www.swig.org/%swig%$$:
# $href%https://github.com/bradbell/cppad_py/issues/3%issue 3%$$.
# $lnext
# $href%http://www.numpy.org/%numpy%$$.
# $lend
#
# $head Install Using Pip$$
# There is a preliminary version of cppad_py available using $code pip$$.
# To install for you entire system use:
# $codep
#	pip install -i https://test.pypi.org/simple/ cppad_py
# $$
#
# $children%
#   install_error.omh%
#   bin/get_cppad.sh
# %$$
# $head Install Errors$$
# If you get an error message during the install procedure above,
# or the one below, see $cref install_error$$.
# This will only install the release version.
# Installing a debug version is discussed below in the instructions
# for downloading and building from the source code.
#
# $head Download$$
# Use the following command to download the current version of cppad_py:
# $codei%
#	git clone https://github.com/bradbell/cppad_py.git %top_srcdir%
# %$$
#
# $subhead Top Source Directory$$
# The directory you choose for $icode top_srcdir$$ is
# referred to as your top source directory.
#
# $head Configure$$
# Before running $code setup.py$$ or $code bin/get_cppad.sh$$,
# you should check and possibly change the
# $cref/settings/get_cppad.sh/Settings/$$ in $code bin/get_cppad.sh$$.
#
# $head Get cppad$$
# The next step is to get a copy of cppad using $cref get_cppad.sh$$.
#
# $head Test$$
# These steps are optional if you already know that cppad_py
# works on your system.
#
# $subhead Build cppad_py$$
# Build the Python cppad_py module using the command:
# $codei%
#	python setup.py build_ext
# %$$
#
# $subhead python$$
# The next step is to test the cppad_py on your system by executing
# the following commands starting in $icode top_srcdir$$:
# $codei%
#	cd example/python
#	python check_all.py
# %$$
#
# $subhead c++$$
# After $code setup.py$$ has run,
# you can also test the cppad_py c++ interface
# $cref cpp_lib$$ on your system by executing the following commands
# starting in $icode top_srcdir$$:
# $codei%
#	cd build
#	make check_lib_cplusplus
# %$$
#
# $subhead import$$
# If you are in the $icode top_srcdir$$ directory,
# you should be able to import cppad_py using the following commands:
# $codei%
#	python
#	import cppad_py
#	quit()
# %$$
# We need to install cppad_py so you can import it from any directory.
#
#
# $head Install$$
# Use the following command to build and install the debug version of cppad_py:
# $codei%
#	python setup.py build_ext install --prefix=%prefix%
# %$$
# This will install $code cppad_py$$ in the directory
# $codei%
#	%prefix%/%lib%/python%major%.%minor%/site_packages/cppad_py
# %$$
# where $icode lib$$ is $code lib$$ or $code lib64$$,
# $icode major$$ ($icode minor$$) is the major (minor)
# version of $icode python$$.
#
# $head Python Path$$
# Check that the directory
# $codei%
#   %prefix%/%lib%/python%major%.%minor%/site_packages
# %$$
# is in your python path.
# Once it is, you should be able to execute the following commands:
# $codei%
#	python
#	import sys
#	print(sys.path)
#	quit()
# %$$
#
# $end
# -----------------------------------------------------------------------------
