// Child table for section whats_new_2020
document.write('\
<select onchange="whats_new_2020_child(this)">\
<option>whats_new_2020-&gt;</option>\
<option>whats_new_2018</option>\
</select>\
');
function whats_new_2020_child(item)
{	var child_list = [
		'whats_new_2018.htm'
	];
	var index = item.selectedIndex;
	item.selectedIndex = 0;
	if(index > 0)
		document.location = child_list[index-1];
}
