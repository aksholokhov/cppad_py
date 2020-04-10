// Child table for section error_message
document.write('\
<select onchange="error_message_child(this)">\
<option>error_message-&gt;</option>\
<option>error_message_xam.cpp</option>\
<option>error_message_xam.py</option>\
</select>\
');
function error_message_child(item)
{	var child_list = [
		'error_message_xam.cpp.htm',
		'error_message_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
