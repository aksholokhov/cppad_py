// Child table for section py_independent
document.write('\
<select onchange="py_independent_child(this)">\
<option>py_independent-&gt;</option>\
<option>fun_dynamic_xam.py</option>\
</select>\
');
function py_independent_child(item)
{	var child_list = [
		'fun_dynamic_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
