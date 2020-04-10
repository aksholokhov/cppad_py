// Child table for section py_sparse_jac
document.write('\
<select onchange="py_sparse_jac_child(this)">\
<option>py_sparse_jac-&gt;</option>\
<option>sparse_jac_xam.py</option>\
</select>\
');
function py_sparse_jac_child(item)
{	var child_list = [
		'sparse_jac_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
