// Child table for section numeric_seirs_class
document.write('\
<select onchange="numeric_seirs_class_child(this)">\
<option>numeric_seirs_class-&gt;</option>\
<option>numeric_seirs_fit_xam.py</option>\
</select>\
');
function numeric_seirs_class_child(item)
{	var child_list = [
		'numeric_seirs_fit_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
