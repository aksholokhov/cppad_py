var list_across0 = [
'_contents.htm',
'_reference.htm',
'_index.htm',
'_search.htm',
'_external.htm'
];
var list_up0 = [
'cppad_py.htm',
'testing.htm',
'setup.py.htm'
];
var list_down2 = [
'testing.htm',
'swig_xam.i.htm',
'library.htm',
'whats_new_2018.htm'
];
var list_down1 = [
'setup.py.htm',
'get_cppad.sh.htm'
];
var list_current0 = [
'setup.py.htm#Syntax',
'setup.py.htm#Requirements',
'setup.py.htm#Configure',
'setup.py.htm#Configure.verbose_makefile',
'setup.py.htm#Configure.build_type',
'setup.py.htm#Configure.swig_cxx_flags',
'setup.py.htm#Configure.cppad_cxx_flags',
'setup.py.htm#Configure.cppad_prefix',
'setup.py.htm#Configure.test_cppad'
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
