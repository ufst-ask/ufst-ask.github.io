var rulesData = null;
var jsonURL = null;
const ruleTyoeNameLength = 14;

function devLoad() {
	const txt = ""
	rulesData = JSON.parse(txt);
}

function createTableFromData() {
	var table = $('#table-list')
	// Emptying the Table items
	table.find('tbody').html('')

	if (rulesData.length > 0) {
		// If returned json data is not empty
		var i = 1;
		// looping the returned data
		Object.keys(rulesData).map(k => {

			/*let btn = document.createElement("button");
			btn.innerHTML = "Submit";
			// btn.type = "submit";
			btn.name = "formBtn";*/
			// document.body.appendChild(btn);

			// creating new table row element
			var tr = $('<tr id = "ruleRow" class = "' + rulesData[k].essentialRule + ' ' +
				// ' class = "' +
				rulesData[k].tags[0] + ' ' + rulesData[k].tags[1] + ' ' + rulesData[k].tags[2] + ' ' + rulesData[k].tags[3] + ' ' + rulesData[k].tags[4] + '">')

			// first column data
			var tempID = i++;
			switch (rulesData[k].name.slice(0,ruleTyoeNameLength)) {
				case "cleanOfficial_":
					tr.append('<td class="py-1 px-2 text-center" id =' + tempID + '><p style="color:darkgreen">&block;&nbsp;&nbsp;' + tempID + '</p></td>')
					rulesData[k].name = rulesData[k].name.slice(ruleTyoeNameLength);
					break;
				case "othCleanSolid_":
					tr.append('<td class="py-1 px-2 text-center" id =' + tempID + '><p style="color:darkorange">&block;&nbsp;&nbsp;' + tempID + '</p></td>')
					rulesData[k].name = rulesData[k].name.slice(ruleTyoeNameLength);
					break;
				case "reviewOfficia_":
					tr.append('<td class="py-1 px-2 text-center" id =' + tempID + '><p style="color:midnightblue">&block;&nbsp;&nbsp;' + tempID + '</p></td>')
					rulesData[k].name = rulesData[k].name.slice(ruleTyoeNameLength);
					break;
				default:
					tr.append('<td class="py-1 px-2 text-center" id =' + tempID + '>' + tempID + '</td>')
					// ruleName = rulesData[k].name;
					break;
			}

			// second column data
			if (typeof rulesData[k].infoBody === 'string' && rulesData[k].infoBody.length === 0) {
				tr.append('<td class="py-1 px-2" id =' + rulesData[k].name + '>' + rulesData[k].name + ' </td>')
			} else {
				tr.append('<td class="py-1 px-2" id =' + rulesData[k].name + '> <button id="BtnMoreInfo" class="button" onclick = "openMoreInfo('+k+')">' + rulesData[k].name + '</button></td>')
			}

			// third column data
			var tagsString = "";
			for (let i = 0; i < rulesData[k].tags.length; i++) {
				tagsString += rulesData[k].tags[i];
				if(i < (rulesData[k].tags.length-1) ) {
					tagsString += ", ";
				}
			}
			tr.append('<td class="py-1 px-2">' + tagsString + '</td>')

			// fourth column data
			tr.append('<td class="py-1 px-2"> <input type="range" id="status" name="status" min="0" max="2" value="0"> </td>')
			// fifth column data
			tr.append('<td class="py-1 px-2">' + rulesData[k].workload + '</td>')
			// sixth column data
			tr.append('<td class="py-1 px-2">' + rulesData[k].importance  + '</td>')

			console.log({tr});
			// Append table row item to table body
			table.find('tbody').append(tr)
		})
	} else {
		// If returned json data is empty
		var tr = $('<tr>')
		tr.append('<th class="py-1 px-2 text-center">No data to display</th>')
		table.find('tbody').append(tr)
	}

}

function load_data() {
	loadMode = "default";
	if(devMode) {
		loadMode = "inddrivelsesprogrammet";
	}

	switch(loadMode) {
		case "inddrivelsesprogrammet":
			jsonURL = 'rules_inddrivelsesprogrammet.json';
			loadDataFromJson();
			break;
		default:
			jsonURL = 'rules_default_SOLID.json';
			loadDataFromJson();
			break;
	}
}

function load_data_userDefined() {
	jsonURL = document.getElementById("userDefinedJsonURL").value;
	console.log("loaded json: " + jsonURL);
	loadDataFromJson();
}

function loadDataFromJson() {
	// Show loader
	$('#loader').removeClass('d-none')
	// Selecting the table Element
	var table = $('#table-list')
	// Emptying the Table items
	table.find('tbody').html('')
	setTimeout(() => {
		$.ajax({
			// JSON FILE URL
			url: jsonURL,
			// Type of Return Data
			dataType: 'json',
			// Error Function
			error: err => {
				console.log(err)
				alert("An error occured")
				$('#loader').addClass('d-none')
			},
			// Succes Function
			success: function(resp) {
				rulesData = resp
            $('#loader').addClass('d-none')
				createTableFromData();
				onDoneCreatingTable();
        }
		})

	}, 500)
}
 
	$(function() {
	    // Hide loader on document ready
	    $('#loader').addClass('d-none')
	    setTimeout(() => {
	            load_data()
	        }, 200)
	        // Reload Button Function
	    $('#reload_data').click(function() {
	        // refreshing the table data
			load_data()
	    })
	})

function loadUserDefinedJSON(){
	// Get the form and file field
	let form = document.querySelector('#upload');
	let file = document.querySelector('#file');

	/**
	 * Log the uploaded file to the console
	 * @param {event} Event The file loaded event
	 */
	function logFile (event) {
		let str = event.target.result;
		let json = JSON.parse(str);
		rulesData = json;
		createTableFromData();
		onDoneCreatingTable();

		console.log('string', str);
		console.log('json', json);
	}

	/**
	 * Handle submit events
	 * @param  {Event} event The event object
	 */
	function handleSubmit (event) {

		// Stop the form from reloading the page
		event.preventDefault();

		// If there's no file, do nothing
		if (!file.value.length) return;

		// Create a new FileReader() object
		let reader = new FileReader();

		// Setup the callback event to run when the file is read
		reader.onload = logFile;

		// Read the file
		reader.readAsText(file.files[0]);

	}

	// Listen for submit events
	form.addEventListener('submit', handleSubmit);
}