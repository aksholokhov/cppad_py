// Child table for section py_fun_forward
document.write('\
<select onchange="py_fun_forward_child(this)">\
<option>py_fun_forward-&gt;</option>\
<option>fun_forward_xam.py</option>\
</select>\
');
function py_fun_forward_child(item)
{	var child_list = [
		'fun_forward_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
