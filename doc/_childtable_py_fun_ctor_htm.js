// Child table for section py_fun_ctor
document.write('\
<select onchange="py_fun_ctor_child(this)">\
<option>py_fun_ctor-&gt;</option>\
<option>a_fun_xam.py</option>\
</select>\
');
function py_fun_ctor_child(item)
{	var child_list = [
		'a_fun_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
