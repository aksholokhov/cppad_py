// Child table for section cpp_fun_forward
document.write('\
<select onchange="cpp_fun_forward_child(this)">\
<option>cpp_fun_forward-&gt;</option>\
<option>fun_forward_xam.cpp</option>\
</select>\
');
function cpp_fun_forward_child(item)
{	var child_list = [
		'fun_forward_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
