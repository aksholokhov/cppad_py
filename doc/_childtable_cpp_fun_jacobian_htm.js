// Child table for section cpp_fun_jacobian
document.write('\
<select onchange="cpp_fun_jacobian_child(this)">\
<option>cpp_fun_jacobian-&gt;</option>\
<option>fun_jacobian_xam.cpp</option>\
</select>\
');
function cpp_fun_jacobian_child(item)
{	var child_list = [
		'fun_jacobian_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
