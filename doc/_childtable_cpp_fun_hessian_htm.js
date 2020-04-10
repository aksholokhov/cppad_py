// Child table for section cpp_fun_hessian
document.write('\
<select onchange="cpp_fun_hessian_child(this)">\
<option>cpp_fun_hessian-&gt;</option>\
<option>fun_hessian_xam.cpp</option>\
</select>\
');
function cpp_fun_hessian_child(item)
{	var child_list = [
		'fun_hessian_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
