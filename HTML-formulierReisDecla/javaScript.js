function inloggen(){
    var naam = document.getElementById("gebruikersnaam").innerHTML;
    if(naam=="trainee"){
        console.log("10");
        console.log(naam);
    }//end if
    else{
        console.log("7");
        console.log(naam);
        
    }//end else

}//end inloggen




var IDRow = 0;
var IDCell = 1;
function addRowUrenTabel(){
	console.log("check");
	
	table = document.getElementById("urenTabel");
	var insertedRow = table.insertRow(2);
	insertedRow.className = "urenRow";
	insertedRow.id = IDRow++;
	for(var i = 0; i<3; i++){
		console.log(insertedRow.id);
		var insertedCell = insertedRow.insertCell(i);
		insertedCell.id = IDCell++;
		console.log(insertedCell.id);
			if (i == 0) {
				var temp1 = document.createElement("input");
				temp1.type = "text"; 
				
				insertedCell.appendChild(temp1);
				console.log(temp1);
			}
			if (i == 1) {
				// insertedCell.innerHTML = document.dropdown.childNodes;

				var temp1 = document.createElement("div");
				temp1.className = "dropdown";
				temp1.id = "dropdownMenu";
				
				

				var temp3 = document.createElement("div");
				temp3.className = ("dropdownContent");
				temp3.id = ("urenDrop");

				var temp2 = document.createElement("button");
				temp2.className = "dropBtn";
				temp2.id = "urenDropBtn";
				temp2.innerHTML = "Uren &#9660;";
				temp2.addEventListener("click", function() {temp3.classList.toggle("show")});

				var temp4 = document.createElement("ul");

				var temp5 = document.createElement("li");
				temp5.innerHTML = ("Gewerkte Uren");
				var temp6 = document.createElement("li");
				temp6.innerHTML = ("Overuren 100%");
				var temp7 = document.createElement("li");
				temp7.innerHTML = ("Overuren 125%");
				var temp8 = document.createElement("li");
				temp8.innerHTML = ("Verlof Uren");
				var temp9 = document.createElement("li");
				temp9.innerHTML = ("Ziekte Uren");


				temp4.appendChild(temp5);
				temp4.appendChild(temp6);
				temp4.appendChild(temp7);
				temp4.appendChild(temp8);
				temp4.appendChild(temp9);
				temp3.appendChild(temp4);
				temp2.appendChild(temp3);
				temp1.appendChild(temp2);
				
				insertedCell.appendChild(temp1);
				console.log(temp1);
			}
			if (i == 2) {
				insertedCell.innerHTML = 8;
			}
	}
}



function verzondenUren(){
	alert("Uw uren zijn verzonden");
}

function verzondenDeclaraties(){
	alert("Uw declaraties zijn verzonden");
}


// EMIEL - rij met invoervelden toevoegen in een tabel
var declatctdid = 1; //id van een cel van een rij in declaratietabel
function addRowDeclaratieTabel(){
	console.log("check in declaraties");
	table = document.getElementById("declaratieTabel");
    var insertedRow = table.insertRow(2);
    insertedRow.className = "declaratiesRow";
 
	for(var i = 1; i<7; i++){
		//maak cel aan
		tc = document.createElement("td");
		e = document.createElement("div");
		
		// periode
		if(i == 1){
		e = document.createElement("div");
		e.innerHTML = "Maand";	
		}
		// inputvelden
		if(i == 2 || i == 4 || i == 5){
			e = document.createElement("input");
		}
		
		console.log(e);
		//geef cel unieke celid
		e.id = declatctdid;
		console.log(declatctdid);
		declatctdid++;

		//voeg type in cel toe
		tc.appendChild(e);
		console.log(tc);
		//voeg cel in rij toe
		insertedRow.appendChild(tc);		
	}
}
// EMIEL - berekenen van de bedragen van een declaratieformulier
function declaBerekenen(){
	for(var i = 0; i<declatctdid; i++){
		// bedrag voor auto km
		if(i%6 == 2){
			var aantalKM = document.getElementById(i).value;
			console.log("check in declaBerekenen: " + aantalKM);
			var bedragKM = aantalKM*19;// in eurocenten uitgegaan van 19 cent per km
			setBedrag = document.getElementById(i+1);
			setBedrag.innerHTML = bedragKM/100;
		}//end if
		declaTotBer(i, bedragKM);
	}//end for
}//end function declaBerekenen
	function declaTotBer(i, bedragKM){
		if(i%6==0 && i !=0){
			var auto = bedragKM; //van centen naar euro
			var ov = document.getElementById(i-2).value*100; //in eurocent
			var overig = document.getElementById(i-1).value*100; //in eurocent
			var totaalBedrag = (+auto + +ov + +overig)/100;
			
			console.log("check in declaTotBer: " + totaalBedrag);
			setTotBedrag = document.getElementById(i);
			setTotBedrag.innerHTML = totaalBedrag;
		}//end if2
		
	}












var TableIDvalue = "TabelOverzicht";
var TableLastSortedColumn = -1;
function SortTable() {
var sortColumn = parseInt(arguments[0]);
var type = arguments.length > 1 ? arguments[1] : 'T';
var dateformat = arguments.length > 2 ? arguments[2] : '';
var table = document.getElementById(TableIDvalue);
var tbody = table.getElementsByTagName("tbody")[0];
var rows = tbody.getElementsByTagName("tr");
var arrayOfRows = new Array();
type = type.toUpperCase();
dateformat = dateformat.toLowerCase();
for(var i=0, len=rows.length; i<len; i++) {
	arrayOfRows[i] = new Object;
	arrayOfRows[i].oldIndex = i;
	var celltext = rows[i].getElementsByTagName("td")[sortColumn].innerHTML.replace(/<[^>]*>/g,"");
	if( type=='D' ) { arrayOfRows[i].value = GetDateSortingKey(dateformat,celltext); }
	else {
		var re = type=="N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
		arrayOfRows[i].value = celltext.replace(re,"").substr(0,25).toLowerCase();
		}
	}
if (sortColumn == TableLastSortedColumn) { arrayOfRows.reverse(); }
else {
	TableLastSortedColumn = sortColumn;
	switch(type) {
		case "N" : arrayOfRows.sort(CompareRowOfNumbers); break;
		case "D" : arrayOfRows.sort(CompareRowOfNumbers); break;
		default  : arrayOfRows.sort(CompareRowOfText);
		}
	}
var newTableBody = document.createElement("tbody");
for(var i=0, len=arrayOfRows.length; i<len; i++) {
	newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
	}
table.replaceChild(newTableBody,tbody);
} // function SortTable()

function CompareRowOfText(a,b) {
var aval = a.value;
var bval = b.value;
return( aval == bval ? 0 : (aval > bval ? 1 : -1) );
} // function CompareRowOfText()

function CompareRowOfNumbers(a,b) {
var aval = /\d/.test(a.value) ? parseFloat(a.value) : 0;
var bval = /\d/.test(b.value) ? parseFloat(b.value) : 0;
return( aval == bval ? 0 : (aval > bval ? 1 : -1) );
} // function CompareRowOfNumbers()

function GetDateSortingKey(format,text) {
if( format.length < 1 ) { return ""; }
format = format.toLowerCase();
text = text.toLowerCase();
text = text.replace(/^[^a-z0-9]*/,"");
text = text.replace(/[^a-z0-9]*$/,"");
if( text.length < 1 ) { return ""; }
text = text.replace(/[^a-z0-9]+/g,",");
var date = text.split(",");
if( date.length < 3 ) { return ""; }
var d=0, m=0, y=0;
for( var i=0; i<3; i++ ) {
	var ts = format.substr(i,1);
	if( ts == "d" ) { d = date[i]; }
	else if( ts == "m" ) { m = date[i]; }
	else if( ts == "y" ) { y = date[i]; }
	}
d = d.replace(/^0/,"");
if( d < 10 ) { d = "0" + d; }
if( /[a-z]/.test(m) ) {
	m = m.substr(0,3);
	switch(m) {
		case "jan" : m = String(1); break;
		case "feb" : m = String(2); break;
		case "mar" : m = String(3); break;
		case "apr" : m = String(4); break;
		case "may" : m = String(5); break;
		case "jun" : m = String(6); break;
		case "jul" : m = String(7); break;
		case "aug" : m = String(8); break;
		case "sep" : m = String(9); break;
		case "oct" : m = String(10); break;
		case "nov" : m = String(11); break;
		case "dec" : m = String(12); break;
		default    : m = String(0);
		}
	}
m = m.replace(/^0/,"");
if( m < 10 ) { m = "0" + m; }
y = parseInt(y);
if( y < 100 ) { y = parseInt(y) + 2000; }
return "" + String(y) + "" + String(m) + "" + String(d) + "";
} // function GetDateSortingKey()
