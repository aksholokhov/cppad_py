// Child table for section cpp_sparse_rcv
document.write('\
<select onchange="cpp_sparse_rcv_child(this)">\
<option>cpp_sparse_rcv-&gt;</option>\
<option>sparse_rcv_xam.cpp</option>\
</select>\
');
function cpp_sparse_rcv_child(item)
{	var child_list = [
		'sparse_rcv_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
