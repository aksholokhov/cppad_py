// Child table for section a_double
document.write('\
<select onchange="a_double_child(this)">\
<option>a_double-&gt;</option>\
<option>a_double_ctor</option>\
<option>a_double_unary_op</option>\
<option>a_double_property</option>\
<option>a_double_binary</option>\
<option>a_double_compare</option>\
<option>a_double_assign</option>\
<option>a_double_unary_fun</option>\
<option>a_double_cond_assign</option>\
</select>\
');
function a_double_child(item)
{	var child_list = [
		'a_double_ctor.htm',
		'a_double_unary_op.htm',
		'a_double_property.htm',
		'a_double_binary.htm',
		'a_double_compare.htm',
		'a_double_assign.htm',
		'a_double_unary_fun.htm',
		'a_double_cond_assign.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
