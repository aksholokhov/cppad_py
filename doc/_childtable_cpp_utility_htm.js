// Child table for section cpp_utility
document.write('\
<select onchange="cpp_utility_child(this)">\
<option>cpp_utility-&gt;</option>\
<option>vec2cppad_double</option>\
<option>vec2a_double</option>\
<option>error_message</option>\
</select>\
');
function cpp_utility_child(item)
{	var child_list = [
		'vec2cppad_double.htm',
		'vec2a_double.htm',
		'error_message.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
