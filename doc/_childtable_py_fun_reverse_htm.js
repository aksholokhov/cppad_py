// Child table for section py_fun_reverse
document.write('\
<select onchange="py_fun_reverse_child(this)">\
<option>py_fun_reverse-&gt;</option>\
<option>fun_reverse_xam.py</option>\
</select>\
');
function py_fun_reverse_child(item)
{	var child_list = [
		'fun_reverse_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
