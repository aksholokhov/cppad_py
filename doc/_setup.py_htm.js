var list_across0 = [
'_contents.htm',
'_reference.htm',
'_index.htm',
'_search.htm',
'_external.htm'
];
var list_up0 = [
'cppad_py.htm',
'setup.py.htm'
];
var list_down1 = [
'setup.py.htm',
'library.htm',
'whats_new_2018.htm'
];
var list_down0 = [
'get_cppad.sh.htm'
];
var list_current0 = [
'setup.py.htm#Syntax',
'setup.py.htm#External Requirements',
'setup.py.htm#Download',
'setup.py.htm#Download.Top Source Directory',
'setup.py.htm#Configure',
'setup.py.htm#Configure.verbose_makefile',
'setup.py.htm#Configure.build_type',
'setup.py.htm#Configure.extra_cxx_flags',
'setup.py.htm#Configure.cppad_prefix',
'setup.py.htm#Configure.test_cppad',
'setup.py.htm#Get cppad',
'setup.py.htm#Build cppad_py',
'setup.py.htm#Testing',
'setup.py.htm#Testing.python',
'setup.py.htm#Testing.c++',
'setup.py.htm#Testing.import',
'setup.py.htm#Installing',
'setup.py.htm#Python Path'
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
