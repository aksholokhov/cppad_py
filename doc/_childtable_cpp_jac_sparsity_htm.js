// Child table for section cpp_jac_sparsity
document.write('\
<select onchange="cpp_jac_sparsity_child(this)">\
<option>cpp_jac_sparsity-&gt;</option>\
<option>sparse_jac_pattern_xam.cpp</option>\
</select>\
');
function cpp_jac_sparsity_child(item)
{	var child_list = [
		'sparse_jac_pattern_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
