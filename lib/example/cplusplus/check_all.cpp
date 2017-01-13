/* ----------------------------------------------------------------------------
          cppad_swig: A C++ Object Library and Swig Interface to Cppad
           Copyright (C) 2017-17 Bradley M. Bell (bradbell@seanet.com)
               This program is distributed under the terms of the
           GNU Affero General Public License version 3.0 or later see
                      http://www.gnu.org/licenses/agpl.txt
---------------------------------------------------------------------------- */

// system includes
# include <iostream>
# include <cassert>

// external compiled tests
extern bool a_double_property_xam(void);
extern bool a_double_unary_xam(void);
extern bool a_double_assign_xam(void);
extern bool a_double_ad_binary_xam(void);
extern bool a_double_compare_xam(void);
extern bool a_vector_size_xam(void);
extern bool a_vector_set_get_xam(void);
extern bool a_fun_jacobian_xam(void);
extern bool a_fun_forward_xam(void);
extern bool a_fun_reverse_xam(void);
extern bool a_fun_abort_xam(void);
extern bool a_other_error_message_xam(void);

namespace {
	// function that runs one test
	static size_t Run_ok_count    = 0;
	static size_t Run_error_count = 0;
	bool Run(bool TestOk(void), const char *name)
	{	bool ok = true;
		ok &= TestOk();
		if( ok )
		{	std::cout << "OK:    " << "cplusplus: " << name << std::endl;
			Run_ok_count++;
		}
		else
		{	std::cout << "Error: " << "cplusplus: " << name << std::endl;
			Run_error_count++;
		}
		return ok;
	}
}

// main program that runs all the tests
int main(void)
{	bool ok = true;
	//
	ok &= Run( a_double_property_xam,     "a_double_property_xam"     );
	ok &= Run( a_double_unary_xam,        "a_double_unary_xam"        );
	ok &= Run( a_double_assign_xam,       "a_double_assign_xam"       );
	ok &= Run( a_double_ad_binary_xam,    "a_double_ad_binary_xam"    );
	ok &= Run( a_double_compare_xam,      "a_double_compare_xam"      );
	ok &= Run( a_vector_size_xam,         "a_vector_size_xam"         );
	ok &= Run( a_vector_set_get_xam,      "a_vector_set_get_xam"      );
	ok &= Run( a_fun_jacobian_xam,        "a_fun_jacobian_xam"        );
	ok &= Run( a_fun_forward_xam,         "a_fun_forward_xam"         );
	ok &= Run( a_fun_reverse_xam,         "a_fun_reverse_xam"         );
	ok &= Run( a_fun_abort_xam,           "a_fun_abort_xam"           );
	ok &= Run( a_other_error_message_xam,     "a_other_error_message_xam"     );
	//
	assert( ok || (Run_error_count > 0) );

	// convert int(size_t) to avoid warning on _MSC_VER systems
	if( ok )
		std::cout << "check_all: OK\n";
	else
		std::cout << int(Run_error_count) << " tests failed]\n";

	return static_cast<int>( ! ok );
}

