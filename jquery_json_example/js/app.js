function sortTable(columnToSort) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table-list");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[columnToSort];
      y = rows[i + 1].getElementsByTagName("TD")[columnToSort];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function onDoneCreatingTable() {
  // Get the modal
  var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}


function openMoreInfo(ruleId ) {
  console.log({jsonElement: ruleId});
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  document.getElementById("modalName").innerText = rulesData[ruleId].name;
  document.getElementById("modalInfoBody").innerText = rulesData[ruleId].infoBody;
  document.getElementById("modalExampleBad").innerText = rulesData[ruleId].exampleBad;
  document.getElementById("modalExampleGood").innerText = rulesData[ruleId].exampleGood;
  document.getElementById("modalReferences1").innerHTML =
       '<a href=' + rulesData[ruleId].references[0] + '>' + rulesData[ruleId].references[1] + '</a>';
  document.getElementById("modalReferences2").innerHTML =
      '<a href=' + rulesData[ruleId].references[2] + '>' + rulesData[ruleId].references[3] + '</a>';
  console.log({modal});
  console.table({resp: rulesData});
}
