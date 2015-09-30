// define action listener on extension button to send current URL
chrome.browserAction.onClicked.addListener(function (tab) {
	sendNotification(tab.url);
});

// create right-click menu for selected text sending
chrome.contextMenus.create({
	title : "Send Bildir.im",
	contexts : ["selection"],
	onclick : function (info, tab) {
		sendNotification(info.selectionText);
	}
});

// gets stored registration ID and sends given message to GCM
function sendNotification(message) {
	// get stored registration ID with default value
	chrome.storage.sync.get({
		// default value of registrationId is empty
		registrationId : ""
	}, function (result) {
		// post to GCM
		$.ajax({
			method : "POST",
			// TODO - will be replaced with backend URL
			url : "https://android.googleapis.com/gcm/send",
			// TODO - will be replaced with backend token
			headers : {
				"Authorization" : "key=API_KEY",
				"Content-Type" : "application/json"
			},
			data : JSON.stringify({
				"data" : {
					"title" : "Bildir.im",
					"message" : message
				},
				"registration_ids" : [result.registrationId]
			})
		}).done(function (response) {
			// for debugging purpose
			console.log(response);
		});
	});
}