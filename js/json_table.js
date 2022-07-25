var rulesData = null;
var jsonURL = null;

function devLoad() {
	const txt = "[{\n" +
		"\t\"name\": \"Pronouncable naming now online\",\n" +
		"\t\"tags\": [\"naming\", \"classes\", \"variables\", \"functions\", \"\"],\n" +
		"\t\"status\": 0,\n" +
		"\t\"workload\": 2,\n" +
		"\t\"importance\": 3,\n" +
		"\t\"infoBody\" : \"This is an explanation...\",\n" +
		"\t\"exampleBad\" : \"don't do this...\",\n" +
		"\t\"exampleGood\" : \"instead do this...\",\n" +
		"\t\"references\" : [\"https://lmgtfy.app/?q=solid+single+responsibility\", \"SOLID Single Responsibility\",\n" +
		"\t\t\t\"https://google.com/\", \"Google\"],\n" +
		"\t\"essentialRule\" : \"isEssential\"\n" +
		"},\n" +
		"\t{\n" +
		"\t\t\"name\": \"A Super naming-ish\",\n" +
		"\t\t\"tags\": [\"naming\", \"classes\", \"SOLID\", \"\", \"\"],\n" +
		"\t\t\"status\": 0,\n" +
		"\t\t\"workload\": 1,\n" +
		"\t\t\"importance\": 5,\n" +
		"\t\t\"infoBody\" : \"This is ALSO an explanation...\",\n" +
		"\t\t\"exampleBad\" : \"really don't do this...\",\n" +
		"\t\t\"exampleGood\" : \"kind of instead do this...\",\n" +
		"\t\t\"references\" : [\"https://google.com/\", \"Google\",\n" +
		"\t\t\t\"\", \"\"],\n" +
		"\t\t\"essentialRule\" : \"notEssential\"\n" +
		"\t},\n" +
		"\t{\n" +
		"\t\t\"name\": \"A Super naming-ish\",\n" +
		"\t\t\"tags\": [\"naming\", \"\", \"SOLID\", \"\", \"\"],\n" +
		"\t\t\"status\": 0,\n" +
		"\t\t\"workload\": 1,\n" +
		"\t\t\"importance\": 5,\n" +
		"\t\t\"infoBody\" : \"This is ALSO an explanation...\",\n" +
		"\t\t\"exampleBad\" : \"really don't do this...\",\n" +
		"\t\t\"exampleGood\" : \"kind of instead do this...\",\n" +
		"\t\t\"references\" : [\"https://google.com/\", \"Google\",\n" +
		"\t\t\t\"\", \"\"],\n" +
		"\t\t\"essentialRule\" : \"notEssential\"\n" +
		"\t},\n" +
		"\t{\n" +
		"\t\t\"name\": \"A Super naming-ish\",\n" +
		"\t\t\"tags\": [\"naming\", \"classes\", \"\", \"\", \"\"],\n" +
		"\t\t\"status\": 0,\n" +
		"\t\t\"workload\": 1,\n" +
		"\t\t\"importance\": 5,\n" +
		"\t\t\"infoBody\" : \"This is ALSO an explanation...\",\n" +
		"\t\t\"exampleBad\" : \"really don't do this...\",\n" +
		"\t\t\"exampleGood\" : \"kind of instead do this...\",\n" +
		"\t\t\"references\" : [\"https://google.com/\", \"Google\",\n" +
		"\t\t\t\"\", \"\"],\n" +
		"\t\t\"essentialRule\" : \"notEssential\"\n" +
		"\t}\n" +
		"]"
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
			tr.append('<td class="py-1 px-2 text-center">' + (i++) + '</td>')

			// second column data
			tr.append('<td class="py-1 px-2"> <button id="BtnMoreInfo" class="button" onclick = "openMoreInfo('+k+')">' + rulesData[k].name + '</button></td>')

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
	loadMode = "repo";
	if(devMode) {
		loadMode = "repo";
	}

	switch(loadMode) {
		case "repo":
			jsonURL = 'data.json';
			loadDataFromJson();
			break;
		case "local":
			jsonURL = 'C:\\dev\\other\\random\\cleanCodeOfflineVersion.json'; //Not allowed
			loadDataFromJson();
			break;
		default:
			devLoad();
			createTableFromData();
			onDoneCreatingTable();
			break;
	}
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