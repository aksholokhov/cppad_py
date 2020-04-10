// Child table for section cpp_independent
document.write('\
<select onchange="cpp_independent_child(this)">\
<option>cpp_independent-&gt;</option>\
<option>fun_dynamic_xam.cpp</option>\
</select>\
');
function cpp_independent_child(item)
{	var child_list = [
		'fun_dynamic_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
