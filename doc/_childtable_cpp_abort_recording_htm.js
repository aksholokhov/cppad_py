// Child table for section cpp_abort_recording
document.write('\
<select onchange="cpp_abort_recording_child(this)">\
<option>cpp_abort_recording-&gt;</option>\
<option>fun_abort_xam.cpp</option>\
</select>\
');
function cpp_abort_recording_child(item)
{	var child_list = [
		'fun_abort_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
