// Child table for section py_fun_optimize
document.write('\
<select onchange="py_fun_optimize_child(this)">\
<option>py_fun_optimize-&gt;</option>\
<option>fun_optimize_xam.py</option>\
</select>\
');
function py_fun_optimize_child(item)
{	var child_list = [
		'fun_optimize_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
