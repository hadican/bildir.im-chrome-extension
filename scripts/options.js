function saveOptions() {
	var registrationId = document.getElementById('registrationId').value;
	
	if(!registrationId) {
		alert("Registration ID can't be empty.");
		return;
	}
	
	chrome.storage.sync.set({
		registrationId : registrationId
	}, function () {
		var status = document.getElementById('status');
		status.textContent = 'Registration ID is saved.';
		setTimeout(function () {
			status.textContent = '';
		}, 3000);
	});
}

function restoreOptions() {
	chrome.storage.sync.get({
		registrationId : ""
	}, function (result) {
		document.getElementById('registrationId').value = result.registrationId;
	});
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
