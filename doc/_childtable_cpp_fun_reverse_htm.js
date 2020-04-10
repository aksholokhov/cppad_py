// Child table for section cpp_fun_reverse
document.write('\
<select onchange="cpp_fun_reverse_child(this)">\
<option>cpp_fun_reverse-&gt;</option>\
<option>fun_reverse_xam.cpp</option>\
</select>\
');
function cpp_fun_reverse_child(item)
{	var child_list = [
		'fun_reverse_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
