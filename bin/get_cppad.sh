#! /bin/bash -e
# -----------------------------------------------------------------------------
#         cppad_py: A C++ Object Library and Python Interface to Cppad
#          Copyright (C) 2017-20 Bradley M. Bell (bradbell@seanet.com)
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
if [ "$0" != "bin/get_cppad.sh" ]
then
	echo "bin/get_cppad.sh: must be executed from its parent directory"
	exit 1
fi
# -----------------------------------------------------------------------------
# CppAD version information
remote_repo='https://github.com/coin-or/CppAD.git'
cppad_version='20200210'
hash_code='69d069212c039e1fecc5aba0a7ed2b0b331fe047'
# -----------------------------------------------------------------------------
# settings in setup.py
#
# verbose_makefile
verbose_makefile=`grep '^verbose_makefile *=' setup.py | \
	sed -e 's|[^=]*= *||' -e 's|"||g' -e "s|'||g"`
#
# extra_cxx_flags
extra_cxx_flags=`grep '^extra_cxx_flags *=' setup.py | \
	sed -e 's|[^=]*= *||' -e 's|"||g' -e "s|'||g"`
#
# cppad_prefix
cppad_prefix=`grep '^cppad_prefix *=' setup.py | \
	sed -e 's|[^=]*= *||' -e 's|"||g' -e "s|'||g"`
#
# test_cppad
test_cppad=`grep '^test_cppad *=' setup.py | \
	sed -e 's|[^=]*= *||' -e 's|"||g' -e "s|'||g"`
# -----------------------------------------------------------------------------
top_source_directory=`pwd`
if [ ! -e 'build' ]
then
	echo_eval mkdir build
fi
echo_eval cd build
cmake_binary_path=`pwd`
#
if [ ! -e "cppad-$cppad_version.git" ]
then
    echo_eval git clone $remote_repo cppad-$cppad_version.git
fi
echo_eval cd cppad-$cppad_version.git
echo_eval git reset --hard
echo_eval git checkout master
echo_eval git pull
echo_eval git checkout --quiet $hash_code
check=`grep '^SET(cppad_version' CMakeLists.txt | \
		sed -e 's|^[^"]*"\([^"]*\)".*|\1|'`
if [ "$check" != "$cppad_version" ]
then
	echo "get_cppad.sh: cppad_version = $cppad_version"
	echo "cppad_version in cppad-$cppad_version.git/CMakeLists.txt = $check"
	exit 1
fi
#
if [ ! -e build ]
then
    echo_eval mkdir build
fi
echo_eval cd build
cat << EOF
cmake -D CMAKE_VERBOSE_MAKEFILE="$verbose_makefile" \\
	-D cppad_prefix="$top_source_directory/$cppad_prefix"  \\
	-D cppad_cxx_flags="$extra_cxx_flags" \\
	..
EOF
# We use debug_even so that the resulting library will be compiled with
# CPPAD_DEBUG_AND_RELEASE defined (can be used with both).
# Note that this causes the library code to be mixed (both debug and release).
cmake -D CMAKE_VERBOSE_MAKEFILE="$verbose_makefile" \
	-D cppad_prefix="$top_source_directory/$cppad_prefix"  \
	-D cppad_cxx_flags="$extra_cxx_flags" \
	-D cppad_debug_which='debug_even' \
	..
#
if [ "$test_cppad" == 'true' ]
then
	make check
fi
make install
# -----------------------------------------------------------------------------
echo 'get_cppad.sh: OK'
exit 0
# -----------------------------------------------------------------------------
# $begin get_cppad.sh$$ $newlinech #$$
# $spell
#	cppad_py
#	cmake
#   yyyymmdd
#	makefile
#	cxx
# $$
#
# $section Get Cppad$$
#
# $head Syntax$$
# $codei%bin/get_cppad.sh%$$
#
# $head Top Source Directory$$
# This program must be run from the
# $cref/top source directory/setup.py/Download/Top Source Directory/$$.
#
# $head setup.py$$
# This program uses the following settings in $cref setup.py$$:
# $code verbose_makefile$$,
# $code extra_cxx_flags$$,
# $code cppad_prefix$$,
# $code test_cppad$$.
#
# $head Caching$$
# This procedure cashes previous builds so that when you re-run
# this script it does not re-do all the work.
# If you have trouble, try deleting the directory
# $codei%
#   build/cppad-%yyyymmdd%.git
# %$$
# and re-running this script.
#
# $end
# -----------------------------------------------------------------------------
