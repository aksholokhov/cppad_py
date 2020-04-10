// Child table for section library
document.write('\
<select onchange="library_child(this)">\
<option>library-&gt;</option>\
<option>py_lib</option>\
<option>cpp_lib</option>\
</select>\
');
function library_child(item)
{	var child_list = [
		'py_lib.htm',
		'cpp_lib.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
