// Child table for section py_fun_hessian
document.write('\
<select onchange="py_fun_hessian_child(this)">\
<option>py_fun_hessian-&gt;</option>\
<option>fun_hessian_xam.py</option>\
</select>\
');
function py_fun_hessian_child(item)
{	var child_list = [
		'fun_hessian_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
