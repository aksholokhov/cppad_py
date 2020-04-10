// Child table for section cpp_sparse_hes
document.write('\
<select onchange="cpp_sparse_hes_child(this)">\
<option>cpp_sparse_hes-&gt;</option>\
<option>sparse_hes_xam.cpp</option>\
</select>\
');
function cpp_sparse_hes_child(item)
{	var child_list = [
		'sparse_hes_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
