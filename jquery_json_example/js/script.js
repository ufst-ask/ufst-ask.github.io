function devLoad() {
	const txt = "[{\n" +
		"\t\"name\": \"Disinformation\",\n" +
		"\t\"tags\": [\"naming, \", \"classes, \", \"variables, \", \"functions\", \"\"],\n" +
		"\t\"status\": 0,\n" +
		"\t\"workload\": 2,\n" +
		"\t\"importance\": 3,\n" +
		"\t\"infoBody\" : \"This is an explanation...\",\n" +
		"\t\"exampleBad\" : \"don't do this...\",\n" +
		"\t\"exampleGood\" : \"instead do this...\",\n" +
		"\t\"references\" : [\"SOLID Single Responsibility\", \"https://lmgtfy.app/?q=solid+single+responsibility\",\n" +
		"\t\t\t\t\t\"Google\", \"https://google.com/\"]\n" +
		"\t},\n" +
		"\t{\n" +
		"\t\t\"name\": \"Super naming-ish\",\n" +
		"\t\t\"tags\": [\"naming, \", \"classes, \", \"\", \"\", \"\"],\n" +
		"\t\t\"status\": 0,\n" +
		"\t\t\"workload\": 1,\n" +
		"\t\t\"importance\": 5,\n" +
		"\t\t\"infoBody\" : \"This is ALSO an explanation...\",\n" +
		"\t\t\"exampleBad\" : \"really don't do this...\",\n" +
		"\t\t\"exampleGood\" : \"kind of instead do this...\",\n" +
		"\t\t\"references\" : [\"Google\", \"https://google.com/\",\n" +
		"\t\t\t\"\", \"\"]\n" +
		"\t}\n" +
		"]"
	const resp = JSON.parse(txt);


	var table = $('#table-list')
	// Emptying the Table items
	table.find('tbody').html('')

	if (resp.length > 0) {
		// If returned json data is not empty
		var i = 1;
		// looping the returned data
		Object.keys(resp).map(k => {
			// creating new table row element
			var tr = $('<tr>')
			// first column data
			tr.append('<td class="py-1 px-2 text-center">' + (i++) + '</td>')
			// second column data
			tr.append('<td class="py-1 px-2">' + resp[k].name + '</td>')
			// third column data
			tr.append('<td class="py-1 px-2">' + resp[k].tags[0] + resp[k].tags[1] + resp[k].tags[2] + resp[k].tags[3] + resp[k].tags[4] + '</td>')
			// fourth column data
			tr.append('<td class="py-1 px-2"> <input type="range" id="status" name="status" min="0" max="2" value="0"> </td>')
			// fifth column data
			tr.append('<td class="py-1 px-2">' + resp[k].workload + '</td>')
			// sixth column data
			tr.append('<td class="py-1 px-2">' + resp[k].importance + '</td>')

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
	devLoad();
	    // Show loader
	    /*$('#loader').removeClass('d-none')
	        // Selecting the table Element
	    var table = $('#table-list')
	        // Emptying the Table items
	    table.find('tbody').html('')
	    setTimeout(() => {
	        $.ajax({
	            // JSON FILE URL
	            url: 'data.json',
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
	                if (resp.length > 0) {
	                    // If returned json data is not empty
	                    var i = 1;
	                    // looping the returned data
	                    Object.keys(resp).map(k => {
	                        // creating new table row element
	                        var tr = $('<tr>')
	                            // first column data
	                        tr.append('<td class="py-1 px-2 text-center">' + (i++) + '</td>')
	                            // second column data
	                        tr.append('<td class="py-1 px-2">' + resp[k].name + '</td>')
	                            // third column data
	                        tr.append('<td class="py-1 px-2">' + resp[k].tags[0] + '</td>')
	                            // fourth column data
	                        tr.append('<td class="py-1 px-2">' + resp[k].status + '</td>')
	                            // fifth column data
	                        tr.append('<td class="py-1 px-2">' + resp[k].workload + '</td>')
	                            // sixth column data
	                        tr.append('<td class="py-1 px-2">' + resp[k].importance + '</td>')
 
	                        // Append table row item to table body
	                        table.find('tbody').append(tr)
	                    })
	                } else {
	                    // If returned json data is empty
	                    var tr = $('<tr>')
	                    tr.append('<th class="py-1 px-2 text-center">No data to display</th>')
	                    table.find('tbody').append(tr)
	                }
	                $('#loader').addClass('d-none')
	            }
	        })
	    }, 500)*/
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