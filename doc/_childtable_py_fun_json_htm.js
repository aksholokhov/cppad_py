// Child table for section py_fun_json
document.write('\
<select onchange="py_fun_json_child(this)">\
<option>py_fun_json-&gt;</option>\
<option>fun_to_json_xam.py</option>\
<option>fun_from_json_xam.py</option>\
</select>\
');
function py_fun_json_child(item)
{	var child_list = [
		'fun_to_json_xam.py.htm',
		'fun_from_json_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
