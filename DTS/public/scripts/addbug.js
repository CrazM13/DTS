fetch('/getprojects').then(function (res) {
	return res.json();
}).then(function (projects) {
	
	projects.projects.forEach(element => {
		document.getElementById("project_dropdown").innerHTML += "<option value=\"" + element.name.toLowerCase() + "\">" + element.name + "</option>";
	});
	
});