// Child table for section cpp_fun_json
document.write('\
<select onchange="cpp_fun_json_child(this)">\
<option>cpp_fun_json-&gt;</option>\
<option>fun_to_json_xam.cpp</option>\
<option>fun_from_json_xam.cpp</option>\
</select>\
');
function cpp_fun_json_child(item)
{	var child_list = [
		'fun_to_json_xam.cpp.htm',
		'fun_from_json_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
