// Child table for section numeric_xam
document.write('\
<select onchange="numeric_xam_child(this)">\
<option>numeric_xam-&gt;</option>\
<option>numeric_optimize_xam.py</option>\
<option>numeric_ode_runge_xam.py</option>\
</select>\
');
function numeric_xam_child(item)
{	var child_list = [
		'numeric_optimize_xam.py.htm',
		'numeric_ode_runge_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
