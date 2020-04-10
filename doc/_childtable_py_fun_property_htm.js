// Child table for section py_fun_property
document.write('\
<select onchange="py_fun_property_child(this)">\
<option>py_fun_property-&gt;</option>\
<option>fun_property_xam.py</option>\
</select>\
');
function py_fun_property_child(item)
{	var child_list = [
		'fun_property_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
