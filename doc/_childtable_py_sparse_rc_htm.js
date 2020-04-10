// Child table for section py_sparse_rc
document.write('\
<select onchange="py_sparse_rc_child(this)">\
<option>py_sparse_rc-&gt;</option>\
<option>sparse_rc_xam.py</option>\
</select>\
');
function py_sparse_rc_child(item)
{	var child_list = [
		'sparse_rc_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
