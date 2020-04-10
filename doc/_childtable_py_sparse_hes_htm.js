// Child table for section py_sparse_hes
document.write('\
<select onchange="py_sparse_hes_child(this)">\
<option>py_sparse_hes-&gt;</option>\
<option>sparse_hes_xam.py</option>\
</select>\
');
function py_sparse_hes_child(item)
{	var child_list = [
		'sparse_hes_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
