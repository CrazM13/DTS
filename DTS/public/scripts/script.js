fetch('/bugcount').then(function (res) {
	return res.json();
}).then(function (counts) {
	
	var maxCount = counts.major_count + counts.minor_count + counts.nth_count;
	
	var major = document.getElementById("bug_count_major");
	major.style.width = ((counts.major_count / maxCount) * 100) + "%";
	major.innerHTML = counts.major_count;
	var minor = document.getElementById("bug_count_minor");
	minor.style.width = ((counts.minor_count / maxCount) * 100) + "%";
	minor.innerHTML = counts.minor_count;
	var nth = document.getElementById("bug_count_nth");
	nth.style.width = ((counts.nth_count / maxCount) * 100) + "%";
	nth.innerHTML = counts.nth_count;
});