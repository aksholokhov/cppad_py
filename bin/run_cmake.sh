#! /bin/bash -e
# -----------------------------------------------------------------------------
#         cppad_py: A C++ Object Library and Python Interface to Cppad
#          Copyright (C) 2017-18 Bradley M. Bell (bradbell@seanet.com)
#              This program is distributed under the terms of the
#              GNU General Public License version 3.0 or later see
#                    https://www.gnu.org/licenses/gpl-3.0.txt
# -----------------------------------------------------------------------------
# bash function that echos and executes a command
echo_eval() {
	echo $*
	eval $*
}
# -----------------------------------------------------------------------------
if [ "$0" != "bin/run_cmake.sh" ]
then
	echo "bin/run_cmake.sh: must be executed from its parent directory"
	exit 1
fi
# -----------------------------------------------------------------------------
# BEGIN user settings
cmake_binary_dir='build'
cmake_generator='Unix Makefiles'
cmake_verbose_makefile='false'
cmake_build_type='debug'
swig_cxx_flags='-Wno-sign-compare -Wno-catch-value -Wno-class-memaccess'
cppad_cxx_flags='-Wall -pedantic-errors'
python_major_version='3'
test_cppad='no'
# END user settings
# -----------------------------------------------------------------------------
distribution_dir=`pwd`
# -----------------------------------------------------------------------------
#
# cmake binary directory
if [ ! -e $cmake_binary_dir ]
then
	echo "run_cmake.sh: bin/get_cppad.sh should have created $cmake_binary_dir"
	exit 1
fi
echo_eval cd $cmake_binary_dir
cmake_binary_path=`pwd`
#
if [ -e CMakeCache.txt ]
then
	echo_eval rm CMakeCache.txt
fi
if [ -e CMakeFiles ]
then
	echo_eval rm -r CMakeFiles
fi
cmake \
	-G "$cmake_generator" \
	-D CMAKE_VERBOSE_MAKEFILE="$cmake_verbose_makefile" \
	-D CMAKE_BUILD_TYPE="$cmake_build_type" \
	-D cppad_prefix="$cmake_binary_path/prefix" \
	-D cppad_cxx_flags="$cppad_cxx_flags" \
	-D python_major_version="$python_major_version" \
	-D swig_cxx_flags="$swig_cxx_flags" \
	..
# -----------------------------------------------------------------------------
echo 'bin/run_cmake.sh: OK'
exit 0
# -----------------------------------------------------------------------------
# $begin run_cmake.sh$$  $newlinech #$$
# $spell
#	Makefiles
#	Rel
#	Cppad
#	Py
#	cmake
#	hpp
#	cxx
#	Wno
#	makefile
#	dir
#	executables
# $$
#
# $section Configure Cppad Py for A system$$
#
# $head Syntax$$
# $codei%bin/run_cmake.sh%$$
#
# $head Source Directory$$
# This program must be run from the
# $cref/source directory/cppad_py/Source Directory/$$.
#
# $head System Settings$$
# Before running $code bin/run_cmake.sh$$,
# the user should check and possibly change the following settings:
# $srcfile%bin/run_cmake.sh%0%# BEGIN user settings%# END user settings%$$
# each of these settings is described below:
#
# $head cmake_binary_dir$$
# This is the sub-directory where object libraries and executables are built.
# It is also the directory where $code make$$ commands are executed.
#
# $head cmake_generator$$
# This determines the type of make files that will be generated by
# $code cmake$$; see
# $href%https://cmake.org/cmake/help/v3.0/manual/cmake-generators.7.html%
#	cmake-generators%$$.
#
# $head cmake_verbose_makefile$$
# This is either $code true$$ or $code false$$.
# If it is true, many of the compiler and Swig options used to
# build the system are output during the $code make$$ commands.
# If it is false, the output during the make commands just describes
# whats is being done without so much detail.
#
# $head cmake_build_type$$
# This is either $code debug$$, $code release$$, $code RelWithDebInfo$$
# or $code MinSizeRel$$; see
# $href%https://cmake.org/cmake/help/v3.0/variable/CMAKE_BUILD_TYPE.html%
#	cmake_build_type%$$.
#
# $head swig_cxx_flags$$
# Extra C++ compiler flags used when compiling code that is created
# by Swig.
#
# $head cppad_cxx_flags$$
# Extra C++ compiler flags used when compiling code that includes Cppad
# header files.
#
# $head python_major_version$$
# This is the major version for python and must be either 2 or 3.
#
# $head test_cppad$$
# If this is $code yes$$, Cppad will build and run it's separate check system
# each time $code bin/run_cmake.sh$$ is run. If you have any problems, it may
# help to isolate the problem by changing this setting to $code yes$$.
#
# $end
# -----------------------------------------------------------------------------
