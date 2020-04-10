// Child table for section vector_size
document.write('\
<select onchange="vector_size_child(this)">\
<option>vector_size-&gt;</option>\
<option>vector_size_xam.cpp</option>\
<option>vector_size_xam.py</option>\
</select>\
');
function vector_size_child(item)
{	var child_list = [
		'vector_size_xam.cpp.htm',
		'vector_size_xam.py.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
