// Child table for section py_fun
document.write('\
<select onchange="py_fun_child(this)">\
<option>py_fun-&gt;</option>\
<option>py_independent</option>\
<option>py_abort_recording</option>\
<option>py_fun_ctor</option>\
<option>py_fun_property</option>\
<option>py_fun_new_dynamic</option>\
<option>py_fun_jacobian</option>\
<option>py_fun_hessian</option>\
<option>py_fun_forward</option>\
<option>py_fun_reverse</option>\
<option>py_fun_optimize</option>\
</select>\
');
function py_fun_child(item)
{	var child_list = [
		'py_independent.htm',
		'py_abort_recording.htm',
		'py_fun_ctor.htm',
		'py_fun_property.htm',
		'py_fun_new_dynamic.htm',
		'py_fun_jacobian.htm',
		'py_fun_hessian.htm',
		'py_fun_forward.htm',
		'py_fun_reverse.htm',
		'py_fun_optimize.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
