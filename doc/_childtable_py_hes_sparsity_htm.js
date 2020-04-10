// Child table for section py_hes_sparsity
document.write('\
<select onchange="py_hes_sparsity_child(this)">\
<option>py_hes_sparsity-&gt;</option>\
<option>sparse_hes_pattern_xam.py</option>\
</select>\
');
function py_hes_sparsity_child(item)
{	var child_list = [
		'sparse_hes_pattern_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
