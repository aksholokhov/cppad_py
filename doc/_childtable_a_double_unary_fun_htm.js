// Child table for section a_double_unary_fun
document.write('\
<select onchange="a_double_unary_fun_child(this)">\
<option>a_double_unary_fun-&gt;</option>\
<option>a_double_unary_fun_xam.cpp</option>\
<option>a_double_unary_fun_xam.py</option>\
</select>\
');
function a_double_unary_fun_child(item)
{	var child_list = [
		'a_double_unary_fun_xam.cpp.htm',
		'a_double_unary_fun_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
