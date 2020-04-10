// Child table for section cpp_lib
document.write('\
<select onchange="cpp_lib_child(this)">\
<option>cpp_lib-&gt;</option>\
<option>a_double</option>\
<option>vector</option>\
<option>cpp_fun</option>\
<option>sparse</option>\
<option>cpp_utility</option>\
<option>more_cpp</option>\
</select>\
');
function cpp_lib_child(item)
{	var child_list = [
		'a_double.htm',
		'vector.htm',
		'cpp_fun.htm',
		'sparse.htm',
		'cpp_utility.htm',
		'more_cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
