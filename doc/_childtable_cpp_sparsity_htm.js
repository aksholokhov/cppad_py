// Child table for section cpp_sparsity
document.write('\
<select onchange="cpp_sparsity_child(this)">\
<option>cpp_sparsity-&gt;</option>\
<option>sparse_hes_pattern_xam.cpp</option>\
</select>\
');
function cpp_sparsity_child(item)
{	var child_list = [
		'sparse_hes_pattern_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
