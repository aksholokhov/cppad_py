// Child table for section a_double_property
document.write('\
<select onchange="a_double_property_child(this)">\
<option>a_double_property-&gt;</option>\
<option>a_double_property_xam.cpp</option>\
<option>a_double_property_xam.py</option>\
</select>\
');
function a_double_property_child(item)
{	var child_list = [
		'a_double_property_xam.cpp.htm',
		'a_double_property_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
