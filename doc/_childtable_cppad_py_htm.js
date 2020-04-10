// Child table for section cppad_py
document.write('\
<select onchange="cppad_py_child(this)">\
<option>cppad_py-&gt;</option>\
<option>setup.py</option>\
<option>library</option>\
<option>whats_new_2020</option>\
<option>_reference</option>\
<option>_index</option>\
<option>_search</option>\
<option>_external</option>\
</select>\
');
function cppad_py_child(item)
{	var child_list = [
		'setup.py.htm',
		'library.htm',
		'whats_new_2020.htm',
		'_reference.htm',
		'_index.htm',
		'_search.htm',
		'_external.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
