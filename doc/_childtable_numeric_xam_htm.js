// Child table for section numeric_xam
document.write('\
<select onchange="numeric_xam_child(this)">\
<option>numeric_xam-&gt;</option>\
<option>numeric_runge4_one_step</option>\
<option>numeric_runge4_multi_step</option>\
<option>numeric_optimize_fun_class</option>\
<option>numeric_seirs_class</option>\
</select>\
');
function numeric_xam_child(item)
{	var child_list = [
		'numeric_runge4_one_step.htm',
		'numeric_runge4_multi_step.htm',
		'numeric_optimize_fun_class.htm',
		'numeric_seirs_class.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
