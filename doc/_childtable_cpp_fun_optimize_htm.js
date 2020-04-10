// Child table for section cpp_fun_optimize
document.write('\
<select onchange="cpp_fun_optimize_child(this)">\
<option>cpp_fun_optimize-&gt;</option>\
<option>fun_optimize_xam.cpp</option>\
</select>\
');
function cpp_fun_optimize_child(item)
{	var child_list = [
		'fun_optimize_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
