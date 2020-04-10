// Child table for section cpp_sparse_jac
document.write('\
<select onchange="cpp_sparse_jac_child(this)">\
<option>cpp_sparse_jac-&gt;</option>\
<option>sparse_jac_xam.cpp</option>\
</select>\
');
function cpp_sparse_jac_child(item)
{	var child_list = [
		'sparse_jac_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
