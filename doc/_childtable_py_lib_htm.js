// Child table for section py_lib
document.write('\
<select onchange="py_lib_child(this)">\
<option>py_lib-&gt;</option>\
<option>py_fun</option>\
<option>py_sparse</option>\
<option>py_utility</option>\
<option>more_py</option>\
</select>\
');
function py_lib_child(item)
{	var child_list = [
		'py_fun.htm',
		'py_sparse.htm',
		'py_utility.htm',
		'more_py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
