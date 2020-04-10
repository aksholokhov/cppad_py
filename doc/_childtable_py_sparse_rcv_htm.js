// Child table for section py_sparse_rcv
document.write('\
<select onchange="py_sparse_rcv_child(this)">\
<option>py_sparse_rcv-&gt;</option>\
<option>sparse_rcv_xam.py</option>\
</select>\
');
function py_sparse_rcv_child(item)
{	var child_list = [
		'sparse_rcv_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
