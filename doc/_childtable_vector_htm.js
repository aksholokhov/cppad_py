// Child table for section vector
document.write('\
<select onchange="vector_child(this)">\
<option>vector-&gt;</option>\
<option>vector_ctor</option>\
<option>vector_size</option>\
<option>vector_set_get</option>\
</select>\
');
function vector_child(item)
{	var child_list = [
		'vector_ctor.htm',
		'vector_size.htm',
		'vector_set_get.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
