# -----------------------------------------------------------------------------
#         cppad_py: A C++ Object Library and Python Interface to Cppad
#          Copyright (C) 2017-20 Bradley M. Bell (bradbell@seanet.com)
#              This program is distributed under the terms of the
#              GNU General Public License version 3.0 or later see
#                    https://www.gnu.org/licenses/gpl-3.0.txt
# -----------------------------------------------------------------------------
# $begin seirs$$
#
# $section A Covid-19 SEIRS Model$$
#
# $latex \[
# \begin{array}{rcl}
# \dot{S}(t) & = & - \beta(t) S(t) I(t) + \xi R(t)    \\
# \dot{E}(t) & = & + \beta(t) S(t) I(t) - \sigma E(t) \\
# \dot{I}(t) & = & + \sigma E(t) - \gamma  I(t) \\
# \dot{R}(t) & = & + \gamma I(t)
# \end{array}
# \] $$
#
#
# \end{array}
# \] $$
#
# $end

from pdb import set_trace
from matplotlib import pyplot
import scipy.optimize
import numpy
import copy
import cppad_py
import runge4
from optimize_fun_class import optimize_fun_class

class seirs :
	def set_ode_p(self, ode_p) :
		self.ode_p = ode_p

	def set_t_all(self, t_all) :
		self.t_all = t_all

	def set_y_init(self, y_init) :
		self.y_init = y_init

	def ode(self, t, c_vec) :
		S      = c_vec[0]
		E      = c_vec[1]
		I      = c_vec[2]
		R      = c_vec[3]
		beta   = self.ode_p[0]
		sigma  = self.ode_p[1]
		gamma  = self.ode_p[2]
		xi     = self.ode_p[3]
		Sdot   = - beta * S * I - xi * R
		Edot   = + beta * S * I - sigma * E
		Idot   = + sigma * E - gamma * I
		Rdot   = + gamma * I - xi * R
		return numpy.array([ Sdot, Edot, Idot, Rdot])

	def model(self) :
		y_all     = runge4.multi_step(self.ode, self.t_all, self.y_init)
		return y_all

def objective_d_fun(t_all, I_data) :
	#
	# 8 variables, 4 in ode_p, 4 in y_init
	x  = numpy.ones(8)
	ax = cppad_py.independent(x)
	#
	# x = concatenate( ode_p , y_init )
	aode_p   = ax[0:4]
	ay_init  = ax[4:8]
	#
	# set up seirs model
	seirs_obj = seirs()
	seirs_obj.set_t_all(t_all)
	seirs_obj.set_ode_p(aode_p)
	seirs_obj.set_y_init(ay_init)
	#
	# compute model for data
	ay_model = seirs_obj.model()
	#
	# model for the data
	aI_model  = ay_model[:,2] # S=0, E=1, I=2, R=3
	#
	# compute loss function
	aresidual = I_data - aI_model
	aloss     = numpy.sum( aresidual * aresidual)
	aloss     = numpy.array( [ aloss ] )
	#
	objective_ad = cppad_py.d_fun(ax, aloss)
	return objective_ad

def seirs_fit_xam() :
	ok = True
	#
	# parameter values used to simulate data
	seirs_obj = seirs()
	ode_p_true = [
		0.3,          # beta:  exposure rate
		1.0 / 5.0,    # sigma: on average 5 days from exposure to infectious
		1.0 / 20.0,   # gamma: on average 20 days from infectors to recovered
		0.0,          # xi: immunity is permanent
	]
	seirs_obj.set_ode_p(ode_p_true)
	t_init    = 0.0
	t_final   = 50.0
	n_step    = 40
	t_all     = numpy.linspace(t_init, t_final, n_step)
	seirs_obj.set_t_all(t_all)
	#
	I_start      = 0.01
	E_start      = I_start * ode_p_true[0] / ode_p_true[1]
	S_start      = 1.0 - E_start - I_start
	y_init_true  = numpy.array( [ S_start, E_start, I_start, 0.0 ] )
	seirs_obj.set_y_init(y_init_true)
	#
	# noiseless simulated data
	y_model    = seirs_obj.model()
	if False :
		ax = pyplot.subplot(111)
		ax.plot(t_all, y_model[:,0], 'b-', label='S')
		ax.plot(t_all, y_model[:,1], 'g-', label='E')
		ax.plot(t_all, y_model[:,2], 'r-', label='I')
		ax.plot(t_all, y_model[:,3], 'k-', label='R')
		ax.legend()
		pyplot.show()
	#
	# objective function for fitting y_init and ode_p to data
	I_data = y_model[:,2]
	objective_ad = objective_d_fun(t_all, I_data)
	#
	# objective: fun, grad, hess
	optimize_fun = optimize_fun_class(objective_ad)
	#
	# bounds
	x_true      = numpy.concatenate( (ode_p_true, y_init_true) )
	lower_bound = x_true / 5.0
	upper_bound = x_true * 5.0
	bounds = scipy.optimize.Bounds(
		lower_bound,
		upper_bound,
		keep_feasible = True
	)
	options = {
		'gtol'    : 1e-8,
		'xtol'    : 1e-8,
		'maxiter' : 300,
		'verbose' : 0,
	}
	start_point = x_true / 2.0
	result = scipy.optimize.minimize(
		optimize_fun.objective_fun,
		start_point,
		method  = 'trust-constr',
		jac     = optimize_fun.objective_grad,
		hess    = optimize_fun.objective_hess,
		options = options,
		bounds  = bounds,
	)
	ok      = ok and result.success
	x_hat   = result.x
	for i in range(8) :
		if x_true[i] == 0.0 :
			rel_error = x_hat[i]
		else :
			rel_error = x_hat[i] / x_true[i] - 1.0
		ok = ok and abs(rel_error) < 1e-2
	#
	return ok
