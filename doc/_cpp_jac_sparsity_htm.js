var list_across0 = [
'_contents.htm',
'_reference.htm',
'_index.htm',
'_search.htm',
'_external.htm'
];
var list_up0 = [
'cppad_py.htm',
'library.htm',
'cpp_lib.htm',
'sparse.htm',
'cpp_jac_sparsity.htm'
];
var list_down4 = [
'setup.py.htm',
'library.htm',
'whats_new_2018.htm'
];
var list_down3 = [
'py_lib.htm',
'cpp_lib.htm'
];
var list_down2 = [
'a_double.htm',
'vector.htm',
'a_fun.htm',
'sparse.htm',
'error.htm'
];
var list_down1 = [
'cpp_sparse_rc.htm',
'cpp_sparse_rcv.htm',
'cpp_jac_sparsity.htm',
'cpp_sparsity.htm',
'cpp_sparse_jac.htm',
'cpp_sparse_hes.htm'
];
var list_down0 = [
'sparse_jac_pattern_xam.cpp.htm'
];
var list_current0 = [
'cpp_jac_sparsity.htm#Syntax',
'cpp_jac_sparsity.htm#Purpose',
'cpp_jac_sparsity.htm#Purpose.for_jac_sparsity',
'cpp_jac_sparsity.htm#Purpose.rev_jac_sparsity',
'cpp_jac_sparsity.htm#x',
'cpp_jac_sparsity.htm#af',
'cpp_jac_sparsity.htm#pattern_in',
'cpp_jac_sparsity.htm#pattern_out',
'cpp_jac_sparsity.htm#Sparsity for Entire Jacobian',
'cpp_jac_sparsity.htm#Example'
];
function choose_across0(item)
{	var index          = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = list_across0[index-1];
}
function choose_up0(item)
{	var index          = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = list_up0[index-1];
}
function choose_down4(item)
{	var index          = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = list_down4[index-1];
}
function choose_down3(item)
{	var index          = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = list_down3[index-1];
}
function choose_down2(item)
{	var index          = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = list_down2[index-1];
}
function choose_down1(item)
{	var index          = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = list_down1[index-1];
}
function choose_down0(item)
{	var index          = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = list_down0[index-1];
}
function choose_current0(item)
{	var index          = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = list_current0[index-1];
}