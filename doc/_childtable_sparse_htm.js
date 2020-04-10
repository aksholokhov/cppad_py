// Child table for section sparse
document.write('\
<select onchange="sparse_child(this)">\
<option>sparse-&gt;</option>\
<option>cpp_sparse_rc</option>\
<option>cpp_sparse_rcv</option>\
<option>cpp_jac_sparsity</option>\
<option>cpp_sparsity</option>\
<option>cpp_sparse_jac</option>\
<option>cpp_sparse_hes</option>\
</select>\
');
function sparse_child(item)
{	var child_list = [
		'cpp_sparse_rc.htm',
		'cpp_sparse_rcv.htm',
		'cpp_jac_sparsity.htm',
		'cpp_sparsity.htm',
		'cpp_sparse_jac.htm',
		'cpp_sparse_hes.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
