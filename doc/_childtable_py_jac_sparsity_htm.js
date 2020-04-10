// Child table for section py_jac_sparsity
document.write('\
<select onchange="py_jac_sparsity_child(this)">\
<option>py_jac_sparsity-&gt;</option>\
<option>sparse_jac_pattern_xam.py</option>\
</select>\
');
function py_jac_sparsity_child(item)
{	var child_list = [
		'sparse_jac_pattern_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
