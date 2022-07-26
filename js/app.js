var devMode = true;

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
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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

function lessImportantVisible() {
	var myBox = document.querySelector("#rulesTable").addEventListener("click", function() {

  this.classList.toggle('bg-red');
});
}

function onDoneCreatingTable() {
  // Get the modal
  var modal = document.getElementById("myModal");

// Get the button that opens the modal
  var btn = document.getElementById("BtnMoreInfo23");

// Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
  /*btn.onclick = function openMoreInfo(jsonElement ) {
    console.log({jsonElement});
    console.log({modal});
    modal.style.display = "block";
  }*/

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
  if(!devMode) {
    resetToEssential("isEssential");
  }
}


function openMoreInfo(ruleId ) {
  console.log({jsonElement: ruleId});
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  document.getElementById("modalName").innerText = rulesData[ruleId].name;

  infoText = replaceStandardTextIfRecognised(rulesData[ruleId].infoBody);
  document.getElementById("modalInfoBody").innerText = infoText;
  document.getElementById("modalExampleBad").innerText = rulesData[ruleId].exampleBad;
  document.getElementById("modalExampleGood").innerText = rulesData[ruleId].exampleGood;
  /*document.getElementById("modalReferences1").innerHTML =
       '<a href=' + rulesData[ruleId].references[0] + '>' + rulesData[ruleId].references[1] + '</a>';
  document.getElementById("modalReferences2").innerHTML =
      '<a href=' + rulesData[ruleId].references[2] + '>' + rulesData[ruleId].references[3] + '</a>';*/

  addReferences(ruleId);

}

function replaceStandardTextIfRecognised(text) {
  text = text.replace("_MoreInfoInBook", "You can read more about this concept in \"The Robert C. Martin Clean Code Collection (Collection)\".\n In order to avoid violating copyrights, this element is not explained but simply referenced.\nFollow the link in references to the book which you can purchase online.\"");
  return text;
}

function addReferences(ruleId ) {
  document.getElementById("modalReferences").innerHTML = "";
  for (let i = 0; i < rulesData[ruleId].references.length; i+=2) {
    var aRef = document.createElement("a");
    aRef.innerHTML = '<a href=' + rulesData[ruleId].references[i] + '>' + rulesData[ruleId].references[i+1] + '</a><br>';
    document.getElementById("modalReferences").appendChild(aRef);
  }
}

function displayByTag(tag) {
  console.log({tag});
   var tableRows = document.getElementsByTagName("tr");
  console.log({tableRows});
   for (i = 1; i < (tableRows.length); i++) {
     if(tableRows[i].classList.contains(tag)) {
       tableRows[i].style.visibility = "visible";
     }
   }
  sortTableByVisibility();
}

function resetToEssential(tag) {
  console.log({tag});
  var tableRows = document.getElementsByTagName("tr");
  console.log({tableRows});
  for (i = 1; i < (tableRows.length); i++) {
    if(tableRows[i].classList.contains(tag)) {
      tableRows[i].style.visibility = "visible";
    } else {
      tableRows[i].style.visibility = "hidden";
      tableRows[i].style.visibility = "collapse";
    }
  }
}
