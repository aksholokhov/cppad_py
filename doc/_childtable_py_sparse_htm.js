// Child table for section py_sparse
document.write('\
<select onchange="py_sparse_child(this)">\
<option>py_sparse-&gt;</option>\
<option>py_sparse_rc</option>\
<option>py_sparse_rcv</option>\
<option>py_jac_sparsity</option>\
<option>py_hes_sparsity</option>\
<option>py_sparse_jac</option>\
<option>py_sparse_hes</option>\
</select>\
');
function py_sparse_child(item)
{	var child_list = [
		'py_sparse_rc.htm',
		'py_sparse_rcv.htm',
		'py_jac_sparsity.htm',
		'py_hes_sparsity.htm',
		'py_sparse_jac.htm',
		'py_sparse_hes.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
