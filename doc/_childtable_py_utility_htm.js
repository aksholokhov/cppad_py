// Child table for section py_utility
document.write('\
<select onchange="py_utility_child(this)">\
<option>py_utility-&gt;</option>\
<option>numpy2vec</option>\
<option>vec2numpy</option>\
</select>\
');
function py_utility_child(item)
{	var child_list = [
		'numpy2vec.htm',
		'vec2numpy.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
