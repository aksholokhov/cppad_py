// Child table for section a_double_binary
document.write('\
<select onchange="a_double_binary_child(this)">\
<option>a_double_binary-&gt;</option>\
<option>a_double_binary_xam.cpp</option>\
<option>a_double_binary_xam.py</option>\
</select>\
');
function a_double_binary_child(item)
{	var child_list = [
		'a_double_binary_xam.cpp.htm',
		'a_double_binary_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}