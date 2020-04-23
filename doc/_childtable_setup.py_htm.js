// Child table for section setup.py
document.write('\
<select onchange="setup__46__py_child(this)">\
<option>setup.py-&gt;</option>\
<option>install_error</option>\
<option>get_cppad.sh</option>\
</select>\
');
function setup__46__py_child(item)
{	var child_list = [
		'install_error.htm',
		'get_cppad.sh.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
