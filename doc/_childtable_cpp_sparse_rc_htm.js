// Child table for section cpp_sparse_rc
document.write('\
<select onchange="cpp_sparse_rc_child(this)">\
<option>cpp_sparse_rc-&gt;</option>\
<option>sparse_rc_xam.cpp</option>\
</select>\
');
function cpp_sparse_rc_child(item)
{	var child_list = [
		'sparse_rc_xam.cpp.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
