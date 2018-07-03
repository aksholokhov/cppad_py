# This file can be generated in the lib/xam directory using the command:
# m4 -D `Language_'=python sparse/jac_pattern_xam.xam
# -----------------------------------------------------------------------------
#         cppad_py: A C++ Object Library and Python Interface to Cppad
#          Copyright (C) 2017-18 Bradley M. Bell (bradbell@seanet.com)
#              This program is distributed under the terms of the
#              GNU General Public License version 3.0 or later see
#                    https://www.gnu.org/licenses/gpl-3.0.txt
# -----------------------------------------------------------------------------
# for_jac_sparsity, rev_jac_sparsity
# -----------------------------------------------------------------------------
# BEGIN SOURCE
def sparse_jac_pattern_xam() :
	#
	# load the Cppad Py library
	import cppad_py
	#
	# initialize return variable
	ok = True
	# ---------------------------------------------------------------------
	# number of dependent and independent variables
	n = 3
	#
	# create the independent variables ax
	x = cppad_py.vec_double(n)
	for i in range( n  ) :
		x[i] = i + 2.0
	#
	ax = cppad_py.independent(x)
	#
	# create dependent variables ay with ay[i] = ax[j]
	# where i = mod(j + 1, n)
	ay = cppad_py.vec_a_double(n)
	for j in range( n  ) :
		i = j+1
		if i >= n  :
			i = i - n
		#
		ay_i = ax[j]
		ay[i] = ay_i
	#
	#
	# define af corresponding to f(x)
	af = cppad_py.a_fun(ax, ay)
	#
	# sparsity pattern for identity matrix
	pat_in = cppad_py.sparse_rc()
	pat_in.resize(n, n, n)
	for k in range( n ) :
		pat_in.put(k, k, k)
	#
	#
	# loop over forward and reverse mode
	for mode in range( 2 ) :
		pat_out = cppad_py.sparse_rc()
		if mode == 0  :
			af.for_jac_sparsity(pat_in, pat_out)
		#
		if mode == 1  :
			af.rev_jac_sparsity(pat_in, pat_out)
		#
		#
		# check that result is sparsity pattern for Jacobian
		ok = ok and n == pat_out.nnz()
		col_major = pat_out.col_major()
		row = pat_out.row()
		col = pat_out.col()
		for k in range( n ) :
			ell = col_major[k]
			r = row[ell]
			c = col[ell]
			i = c+1
			if i >=  n  :
				i = i - n
			#
			ok = ok and c == k
			ok = ok and r == i
		#
	#
	#
	return( ok )
#
# END SOURCE
#
# $begin sparse_jac_pattern_xam.py$$ $newlinech #$$
# $spell
#	py
#	perl
#	cppad
#	py
#	xam
#	Jacobian
#	Jacobians
# $$
# $section Python: Jacobian Sparsity Patterns: Example and Test$$
# $srcfile|build/lib/example/python/sparse_jac_pattern_xam.py|0|# BEGIN SOURCE|# END SOURCE|$$
# $end
#