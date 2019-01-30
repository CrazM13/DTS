fetch('/initbugform').then(function (res) {
	return res.json();
}).then(function (data) {
	
	data.projects.forEach(element => {
		document.getElementById("project_dropdown").innerHTML += "<option value=\"" + element.name.toLowerCase() + "\">" + element.name + "</option>";
	});

	document.getElementById("reporter").value = data.user;
});