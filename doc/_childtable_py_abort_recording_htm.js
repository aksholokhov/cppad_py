// Child table for section py_abort_recording
document.write('\
<select onchange="py_abort_recording_child(this)">\
<option>py_abort_recording-&gt;</option>\
<option>fun_abort_xam.py</option>\
</select>\
');
function py_abort_recording_child(item)
{	var child_list = [
		'fun_abort_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
