# -----------------------------------------------------------------------------
#         cppad_py: A C++ Object Library and Python Interface to Cppad
#          Copyright (C) 2017-20 Bradley M. Bell (bradbell@seanet.com)
#              This program is distributed under the terms of the
#              GNU General Public License version 3.0 or later see
#                    https://www.gnu.org/licenses/gpl-3.0.txt
# -----------------------------------------------------------------------------
# $begin numeric_runge4_multi_step_xam.py$$ $newlinech #$$
# $spell
#	Runge-Kutta
# $$
#
# $section Example Computing Derivative A Runge-Kutta Ode Solution$$
#
# $head ODE$$
# $latex \[
#	\partial_t y_i (t, x) =  f(t, y, x) \left\{ \begin{array}{rl}
#		x_0               & {\rm if} \; i = 0 \\
#		x_i y_{i-1} (t)   & {\rm otherwise}
# \end{array} \right. \]$$
# with the initial condition $latex y(0) = 0$$
#
# $head Solution$$
# This is a special case for which we know the solution
# $latex \[
#	y_i (t, x) = \left\{ \begin{array}{rl}
#		t  x_0                            & {\rm if} \; i = 0 \\
#		( t^i / (i+1) ! ) \prod_{j=0}^i x_j   & {\rm otherwise}
# \end{array} \right. \]$$
#
# $head Derivative of Solution$$
# For this special case, the partial derivative of the solution with respect
# to the j-th component of the vector $latex x$$ is
# $latex \[
#	\partial_{x(j)} y_i (t, x) =  \left\{ \begin{array}{rl}
#		y_i (t, x) / x_j      & {\rm if} \; j \leq i \\
#		0                     & {\rm otherwise}
# \end{array} \right. \]$$
#
#
# $head Source Code$$
# $srcthisfile%
#	0%# BEGIN_PYTHON%# END_PYTHON%1
# %$$
#
# $end
# BEGIN_PYTHON
import numpy
import scipy.misc
import cppad_py
import runge4
#
def f(t, y, x) :
	y_shift = numpy.concatenate( ( [1.0] , y[0:-1] ) )
	return x * y_shift
#
def runge4_multi_step_xam() :
	ok    = True
	nx    = 4
	eps99 = 99.0 * numpy.finfo(float).eps
	#
	# independent variables for this g(x) = y(1, x)
	x  = numpy.array( nx * [ 1.0 ] )
	ax = cppad_py.independent(x)
	#
	# function to pass to runge4.multi_step
	def fun(t, ay) :
		return f(t, ay, ax)
	#
	# initiali value for the ODE
	n_step  = 10
	ay_init =  numpy.array( nx * [ cppad_py.a_double(0.0) ] )
	t_final = 0.75
	t_all   =  [ t_final * i / (n_step - 1) for i in range(n_step) ]
	t_all   =  numpy.array( t_all )
	#
	# take multiple steps
	ay = runge4.multi_step(fun, t_all, ay_init)
	ay_final = ay[n_step - 1,:]
	#
	# g(x) = y(t_final, x)
	g = cppad_py.d_fun(ax, ay_final)
	#
	# Check g_i (x) = prod_{j=0}^i x[j] t^(i+1) / (i+1) !
	# 4th order method should be very accutate for functions
	# or order 4 or less in t.
	x  = numpy.arange(0, nx) + 1.0
	gx = g.forward(0, x)
	prod = 1.0
	for i in range(nx) :
		prod      = prod * x[i]
		power     = numpy.power(t_final, i+1)
		factorial = scipy.misc.factorial(i+1)
		check     = prod * power / factorial
		rel_error = gx[i] / check - 1.0
		ok       &= abs(rel_error) < eps99
	#
	# Check derivative of g_i (x) w.r.t x_j
	# is zero for i < j and  g_i(x) / x_j otherwise
	J = g.jacobian(x)
	for j in range(nx) :
		for i in range(nx) :
			if i < j :
				ok &= J[i,j] == 0.0
			else :
				check     = gx[i] / x[j]
				rel_error = J[i,j] / check - 1.0
				ok       &= abs(rel_error) < eps99

	return ok
# END_PYTHON
