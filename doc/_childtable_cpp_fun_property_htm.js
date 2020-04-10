// Child table for section cpp_fun_property
document.write('\
<select onchange="cpp_fun_property_child(this)">\
<option>cpp_fun_property-&gt;</option>\
<option>fun_property_xam.cpp</option>\
</select>\
');
function cpp_fun_property_child(item)
{	var child_list = [
		'fun_property_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
