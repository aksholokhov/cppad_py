// Child table for section py_fun_jacobian
document.write('\
<select onchange="py_fun_jacobian_child(this)">\
<option>py_fun_jacobian-&gt;</option>\
<option>fun_jacobian_xam.py</option>\
</select>\
');
function py_fun_jacobian_child(item)
{	var child_list = [
		'fun_jacobian_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
