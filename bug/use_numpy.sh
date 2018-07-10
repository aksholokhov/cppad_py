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
if [ "$0" != 'bug/use_numpy.sh' ]
then
	echo 'bug/use_numpy.sh must be executed from its parent directory'
	exit 1
fi
cmake_source_dir=`pwd`
# -----------------------------------------------------------------------------
if [ "$1" != '2' ] && [ "$1" != '3' ]
then
	echo 'usage: bug/use_numpy.sh python_major_version'
	echo 'where python_major_version is 2 or 3.'
	echo 'This program returns ok = False for both versions of python.'
	echo 'Must run setup.py with same version of python before this script.'
	exit 1
fi
python_major_version="$1"
# -----------------------------------------------------------------------------
if [ ! -e 'build/bug' ]
then
	echo_eval mkdir -p build/bug
fi
cd build/bug
# -----------------------------------------------------------------------------
cat << EOF > use_numpy.py
import sys
import os
import numpy
sys.path.insert(0, '$cmake_source_dir')
import cppad_py
def fun(x) :
	n = x.size
	av = cppad_py.vec_a_double(n)
	for i in range(n) :
		av[i] = cppad_py.a_double( x[i] )
	#
	ax = numpy.zeros(n, dtype = cppad_py.a_double)
	for i in range(n) :
		ax[i] = av[i]
	#
	print( x[0], ax[0].value() )
	return ax
#
#
# initialize return variable
ok = True
# ---------------------------------------------------------------------
n_ind = 2
#
x = numpy.zeros(n_ind, dtype=float)
for i in range( n_ind  ) :
	x[i] = i + 1.0
#
ax = fun(x)
#
ok = ok and ax[0].value() == x[0]
print( x[0], ax[0].value() )
#
print('ok = ', ok )
EOF
echo_eval python$python_major_version use_numpy.py
