// Child table for section numeric_optimize_fun_class
document.write('\
<select onchange="numeric_optimize_fun_class_child(this)">\
<option>numeric_optimize_fun_class-&gt;</option>\
<option>numeric_optimize_fun_xam.py</option>\
</select>\
');
function numeric_optimize_fun_class_child(item)
{	var child_list = [
		'numeric_optimize_fun_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
