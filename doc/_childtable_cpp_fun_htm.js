// Child table for section cpp_fun
document.write('\
<select onchange="cpp_fun_child(this)">\
<option>cpp_fun-&gt;</option>\
<option>cpp_independent</option>\
<option>cpp_abort_recording</option>\
<option>cpp_fun_ctor</option>\
<option>cpp_fun_property</option>\
<option>cpp_fun_new_dynamic</option>\
<option>cpp_fun_jacobian</option>\
<option>cpp_fun_hessian</option>\
<option>cpp_fun_forward</option>\
<option>cpp_fun_reverse</option>\
<option>cpp_fun_optimize</option>\
</select>\
');
function cpp_fun_child(item)
{	var child_list = [
		'cpp_independent.htm',
		'cpp_abort_recording.htm',
		'cpp_fun_ctor.htm',
		'cpp_fun_property.htm',
		'cpp_fun_new_dynamic.htm',
		'cpp_fun_jacobian.htm',
		'cpp_fun_hessian.htm',
		'cpp_fun_forward.htm',
		'cpp_fun_reverse.htm',
		'cpp_fun_optimize.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
