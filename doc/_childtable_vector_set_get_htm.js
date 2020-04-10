// Child table for section vector_set_get
document.write('\
<select onchange="vector_set_get_child(this)">\
<option>vector_set_get-&gt;</option>\
<option>vector_set_get_xam.cpp</option>\
<option>vector_set_get_xam.py</option>\
</select>\
');
function vector_set_get_child(item)
{	var child_list = [
		'vector_set_get_xam.cpp.htm',
		'vector_set_get_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
