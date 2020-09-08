
function takeAttendance() {
	//document.getElementById("activateme").disabled = false;
	var e = document.getElementById("ListOfSubjects");
	var strUser = e.options[e.selectedIndex].value;
	if(strUser=="0")
		alert('Please choose subject first');
	else
	{
		eel.TakingAttendance(strUser)(function(ret){document.getElementById("present").innerHTML = ret;document.getElementById("noofpresent").innerHTML =" student(s) is/are present";})
		document.getElementById("activateme").disabled = false;
		document.getElementById("activatemeto").disabled = false;
	}
}



function userlogin(){
	var ID = document.forms['UserLoginForm']['loginfaculty_id'].value;
	var Pass = document.forms['UserLoginForm']['loginpass'].value;
	eel.UserLogin(ID,Pass)(function(ret){
		console.log(ret);
		if (ret === ID){
			window.location="home.html";
			eel.CreateTable()();
		}
		else{
			alert(ret);
			document.UserLoginForm.action = "login.html";
		}
	});
}

function GetAllSubjectsFromHtml()
{
	var x = document.getElementById("ListOfSubjects");
  var txt = new Array();
  var i;
  for (i = 0; i < x.length; i++) {
    txt.push(x.options[i].value);
  }
	return(txt);
}



function SetUserName(){  //getting userID and USERNAME from here
	eel.GetuserInfo()(function(ret){
		document.getElementById('loggeduser').innerHTML = ret[1];
		var subjects_taught = new Array(ret[2]);
		var showsubjects = new Array();
		var getttingallsubjects = GetAllSubjectsFromHtml();
		//alert(subjects_taught[0].length);
		for(var i=0;i<subjects_taught[0].length;i++)
		{
			// alert(typeof(getttingallsubjects[0]));
			var string = subjects_taught[0][i].toString();
			//alert(string);
			var found = getttingallsubjects.indexOf(string);
     	//alert(found);
			if(found != -1)
			{

				//alert(found.toString());
				//alert(typeof(found.toString()));
				document.getElementById(found.toString()).style.display = "block";
			}
		}

	})
	//document.getElementById("attend").disabled = false;
}
function usersignup(){
	var identity = document.forms['UserSignupForm']['signupfaculty_id'].value;
	var name = document.forms['UserSignupForm']['signupusername'].value;
	var pass = document.forms['UserSignupForm']['signuppass'].value;
	var dropDown = document.getElementById('dropdown');
	var subjectArray = [], i;
            for (i = 0; i < dropDown.options.length ; i += 1) {
                if (dropDown.options[i].selected) {
                    subjectArray.push( dropDown.options[i].value);
                    //subjectArray.push({ Name: dropDown.options[i].text, Value: dropDown.options[i].value });
                }
            }
            //for(i=0;i<subjectArray.length;i++)
            //	alert(subjectArray[i]);
				eel.UserSignupFunction(identity,name,pass,subjectArray)(function(ret){
					var x = ret;
					if(x==true)
						alert("Successfully Signed Up");
					else
						alert("User already exist");});
}

//var strUser;
//var sdate,fdate;
//function generateClassReport(strUser,sdate,fdate);

function validateRep(){
	var e = document.getElementById("ListOfSubjects");
	var strUser = e.options[e.selectedIndex].value;
	var sdate = document.getElementById("datepick").value;
	var fdate = document.getElementById("datepick1").value;
	//alert(strUser + " " + sdate + " " + fdate);
	if(strUser=="0")
		alert('Please choose subject first');
	else
		if(typeof(Storage) !== "undefined"){
			sessionStorage.setItem("userID",strUser)
			sessionStorage.setItem("start",sdate)
			sessionStorage.setItem("final",fdate)
			eel.validateRep(strUser,sdate,fdate)(function(ret){
			var x = ret;
			if(x == true)
			{
				window.location="classReportFinal.html";
				//alert('Successfully done !');
				//alert('Successfully done !');
			}
			else
				window.location="classreport.html";
				//alert('File not found !');
		});
		}
		else
		{
			alert("Sorry, your browser does not support Web Storage...");
		}
}

//TESTING
function testfunction(){
	alert("This is an alert");
	var struser = localStorage.getItem("userID1");
	var sdate = localStorage.getItem("start1");
	var fdate = localStorage.getItem("final1");

	console.log(struser);
	console.log(sdate);
	console.log(fdate);
}

function setDetails(){

}


//For Individual Report
function validateIRep(){
	var e = document.getElementById("ListOfSubjects");
	var strUser = e.options[e.selectedIndex].value;
	var sdate = document.getElementById("datepick").value;
	var fdate = document.getElementById("datepick1").value;
	alert(strUser + " " + sdate + " " + fdate);
	if(strUser=="0")
		alert('Please choose subject first');
	else
		if(typeof(Storage) !== "undefined"){
			//SESSION STORAGE
			// sessionStorage.setItem("userID1",strUser)
			// sessionStorage.setItem("start1",sdate)
			// sessionStorage.setItem("final1",fdate)

			// Using LOCAL STORAGE
			localStorage.setItem("userID1",strUser);
			localStorage.setItem("start1",sdate);
			localStorage.setItem("final1",fdate);



			eel.validateIRep(strUser,sdate,fdate)(function(ret){
			var x = ret;
			if(x == true)
			{
				window.location="individualReport2.html";
				//alert('Successfully done !');
				//alert('Successfully done !');
			}
			else
				window.location="individualReport1.html";
				//alert('File not found !');
		});
		}
		else
		{
			alert("Sorry, your browser does not support Web Storage...");
		}
}

/*function getRowColCount(strUser,sdate,fdate)
{
	alert(strUser + " " + sdate + " " + fdate);
	eel.getRowColCount(strUser,sdate,fdate)(function(ret){
		//var count = ret;
		//sessionStorage.setItem("rccount",count)
		//alert(typeof(count));
		alert(ret[0]);
		return ret[0];
	});
}*/

function generateClassReport()
{
	var strUser = sessionStorage.getItem("userID");
	var sdate = sessionStorage.getItem("start");
	var fdate = sessionStorage.getItem("final");
	//alert(strUser + " " + sdate + " " + fdate);
	eel.generateClassReport(strUser,sdate,fdate)(function(ret){
		var jsArray = new Array(ret);
		alert(jsArray[0][0]);
		//var count = new Array(getRowColCount(strUser,sdate,fdate));
		//alert(typeof(count));
		//count = getRowColCount(strUser,sdate,fdate);
		//alert(count);
		eel.getRowColCount(strUser,sdate,fdate)(function(ret){
		//var count = ret;
		//sessionStorage.setItem("rccount",count)
		//alert(typeof(count));
		//alert(ret);
		var rcount = ret[0];								//row count
		var ccount = ret[1];								//column count
		var presentcount;
		var absentcount;
		var presentArray = new Array();
		var absentArray = new Array();
		var percentageArray = new Array();
		for(j=2;j<ccount;j++)								//logic for calculating no of present and absent and class attendance percentage
		{
			presentcount = 0;
			absentcount = 0;
			for(i=1;i<rcount;i++)
			{
				if(jsArray[0][i][j] == 'Present')
					presentcount +=1;
				else
					absentcount +=1;
			}
			presentArray.push(presentcount);
			absentArray.push(absentcount);
			percentageArray.push(Math.floor(((presentcount)/(absentcount+presentcount))*10000)/100);
				//Math.floor(num * 100) / 100
		}
		alert(presentArray.length + " " + absentArray.length + " " + percentageArray.length);
		document.getElementById("sid").innerHTML = strUser;
		document.getElementById("fromd").innerHTML = sdate;
		document.getElementById("tod").innerHTML = fdate;
		var table = document.getElementById("myTable");
  		var tHead = document.createElement("thead");


			// CREATE ROW FOR TABLE HEAD .
		var hRow = document.createElement("tr");

			// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
		for (var i = 0; i < ccount; i++) {
					var th = document.createElement("th");
					th.innerHTML = jsArray[0][0][i];
					hRow.appendChild(th);
		}
		tHead.appendChild(hRow);
		table.appendChild(tHead);

		// CREATE TABLE BODY .
		var tBody = document.createElement("tbody");


			// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
		for (var i = 1; i < rcount; i++) {

			var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .


			for (var j = 0; j < ccount; j++) {
						var td = document.createElement("td");
						td.innerHTML = jsArray[0][i][j];
						bRow.appendChild(td);
			}
			tBody.appendChild(bRow)
		}

			//table.appendChild(tBody);

			var brow1 = document.createElement("tr");

			var td0 = document.createElement("td")
			//td0.setAttribute("id", "mytd0");
			td0.innerHTML = "  No. of ";
			brow1.appendChild(td0);
			//document.getElementById("mytd0").colSpan = "2";
			var td1 = document.createElement("td")
			//td0.setAttribute("id", "mytd0");
			td1.innerHTML = "Present ";
			brow1.appendChild(td1);

			for(var j=0; j < presentArray.length; j++)
			{
				var td2 = document.createElement("td");
				td2.innerHTML = presentArray[j];
				brow1.appendChild(td2);
			}
			tBody.appendChild(brow1);

			var brow2 = document.createElement("tr");

			var td0 = document.createElement("td")
			//td0.setAttribute("id", "mytd0");
			td0.innerHTML = "  No. of ";
			brow2.appendChild(td0);
			//document.getElementById("mytd0").colSpan = "2";
			var td1 = document.createElement("td")
			//td0.setAttribute("id", "mytd0");
			td1.innerHTML = "Absent ";
			brow2.appendChild(td1);

			for(var j=0; j < absentArray.length; j++)
			{
				var td2 = document.createElement("td");
				td2.innerHTML = absentArray[j];
				brow2.appendChild(td2);
			}
			tBody.appendChild(brow2);

			var brow3 = document.createElement("tr");

			var td0 = document.createElement("td")
			//td0.setAttribute("id", "mytd0");
			td0.innerHTML = "  Present ";
			brow3.appendChild(td0);
			//document.getElementById("mytd0").colSpan = "2";
			var td1 = document.createElement("td")
			//td0.setAttribute("id", "mytd0");
			td1.innerHTML = "Percentage ";
			brow3.appendChild(td1);

			for(var j=0; j < percentageArray.length; j++)
			{
				var td2 = document.createElement("td");
				td2.innerHTML = percentageArray[j];
				brow3.appendChild(td2);
			}
			tBody.appendChild(brow3);
			table.appendChild(tBody);

	});
	});
}

function extracting_details_from_rollno_into_single_report()
{
   var rolno = sessionStorage.getItem("rollno");
	 var subjectCode = localStorage.getItem("userID1");
	 var start_date = localStorage.getItem("start1");
	 var end_date = localStorage.getItem("final1");
	 console.log(subjectCode);

	 eel.extractingstudentdetails(rolno,subjectCode)(function (ret) {
		document.getElementById("rollnogoeshere").innerHTML = ret[0][0]; document.getElementById("rollnogoesheremodal").innerHTML = ret[0][0];
		document.getElementById("namegoeshere").innerHTML = ret[0][1]; document.getElementById("namegoesheremodal").innerHTML = ret[0][1];
		document.getElementById("btaddressgoeshere").innerHTML = ret[0][2];
		document.getElementById("semnogoeshere").innerHTML = "Semester "+ret[1][2];
		document.getElementById("subjectgoeshere").innerHTML = ret[1][1] + "(" + ret[1][0] + ")";
	 	console.log("Done woth PYTHON");
		eel.extracting_attendance_details_from_excel(subjectCode,start_date,end_date,rolno)(function(ret){
			var jsATTarray = new Array(ret);
			var column_count = jsATTarray[0][2];
			document.getElementById("TotalNoofClassesInDuration").innerHTML = column_count; //setting 3rd tab to show no. of classes that happended during the date duration
			document.getElementById("TotalNoofClassesInDurationmodal").innerHTML = column_count; //setting 3rd tab to show no. of classes that happended during the date duration
			//Calculation the no. of classes attended and calculating the percentage for the same
			var k ;
			var presentCounts = 0 ;
			for(k=0;k<column_count;k++){
				if(jsATTarray[0][1][k] == "Present"){
					presentCounts++;
				}
			}
			document.getElementById("TotalNoofClassesAttendedInDuration").innerHTML = presentCounts;
			document.getElementById("TotalNoofClassesAttendedInDurationmodal").innerHTML = presentCounts;
			var attPercentage;
			attPercentage = Math.floor(((presentCounts)/(column_count))*10000)/100;
			document.getElementById("PercentageofClassesAttendedInDuration").innerHTML = attPercentage+"%";
			document.getElementById("PercentageofClassesAttendedInDurationmodal").innerHTML = attPercentage+"%";
			var tbodyID = document.getElementById("myattendancetablebody");
			var tbodyID1 = document.getElementById("myattendancetablebodymodal");
			var ctx = document.getElementById('myChart').getContext('2d');
			var ctx1 = document.getElementById('myChartmodal').getContext('2d');
			var chart = new Chart(ctx, {
				// The type of chart we want to create
				type: 'pie',

				// The data for our dataset
				data: {
					labels: ['No. of Absents', 'No. of Presents'],
					datasets: [
						{
							label: 'Attendance',
							data: [(column_count-presentCounts), presentCounts],
							backgroundColor : [
							 "#77419c",
							 "#d4ac0d",
							],
							borderColor:[
								" #eaecee ",
								" #eaecee ",
							],
							hoverBackgroundColor : [
								"# #512e5f   ",
								"#7d6608",
							],
							borderWidth : [1,1]

						}
					]
				},
				// Configuration options go here
				options: {
					events: ['mousemove'],
					animation: {
						duration : 1000,
						easing : "easeInCirc"
						}
				}
			});
			var chart1 = new Chart(ctx1, {
				// The type of chart we want to create
				type: 'pie',

				// The data for our dataset
				data: {
					labels: ['No. of Absents', 'No. of Presents'],
					datasets: [
						{
							label: 'Attendance',
							data: [(column_count-presentCounts), presentCounts],
							backgroundColor : [
							 "#77419c",
							 "#d4ac0d",
							],
							borderColor:[
								" #eaecee ",
								" #eaecee ",
							],
							hoverBackgroundColor : [
								"# #512e5f   ",
								"#7d6608",
							],
							borderWidth : [1,1]

						}
					]
				},
				// Configuration options go here
				options: {
					events: ['mousemove'],
					animation: {
						duration : 1000,
						easing : "easeInCirc"
						}
				}
			});

			var i;
			for(i=0;i<column_count;i++){
				var createTR = document.createElement("tr");
				var createTH = document.createElement("th");
				createTH.setAttribute("scope","row");
				var createTD = document.createElement("td");
				createTH.innerHTML = jsATTarray[0][0][i];
				createTD.innerHTML = jsATTarray[0][1][i];
				createTR.appendChild(createTH);
				createTR.appendChild(createTD);
				tbodyID.appendChild(createTR);
			}
			var j;
			for(j=0;j<column_count;j++){
				var createTR = document.createElement("tr");
				var createTH = document.createElement("th");
				createTH.setAttribute("scope","row");
				var createTD = document.createElement("td");
				createTH.innerHTML = jsATTarray[0][0][j];
				createTD.innerHTML = jsATTarray[0][1][j];
				createTR.appendChild(createTH);
				createTR.appendChild(createTD);
				tbodyID1.appendChild(createTR);
			}

			console.log("Inside Python 2nd Function");
		});
	 });
}

function Storing_rollno_for_single_report(arg)
{
	sessionStorage.setItem("rollno",arg);
	window.location  = "third.html";
}


function viewStudentList()
{
	// var strUser = sessionStorage.getItem("userID1");
	//
	// var sdate = sessionStorage.getItem("start1");
	// var fdate = sessionStorage.getItem("final1");
	var strUser = localStorage.getItem("userID1");
	var sdate = localStorage.getItem("start1");
	var fdate = localStorage.getItem("final1");
	//alert(strUser + " " + sdate + " " + fdate);
	eel.viewStudentList(strUser)(function(ret){
		var jsArray = new Array(ret);
		//alert(jsArray[0][0]);
		eel.getRowCount(strUser)(function(ret){
			var rcount = ret;
			var ccount = 2;
			var table = document.getElementById("myTable");
  			var tHead = document.createElement("thead");


			// CREATE ROW FOR TABLE HEAD .
			var hRow = document.createElement("tr");

			// ADD COLUMN HEADER TO ROW OF TABLE HEAD.


			for (var i = 0; i < ccount; i++) {
					var th = document.createElement("th");
					th.innerHTML = jsArray[0][0][i];
					hRow.appendChild(th);
			}
			tHead.appendChild(hRow);
			table.appendChild(tHead);

			// CREATE TABLE BODY .
			var tBody = document.createElement("tbody");

			// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
			for (var i = 1; i < rcount; i++) {

					var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .


					// for (var j = 0; j < ccount; j++) {
					// 	var td = document.createElement("td");
					// 	td.innerHTML = jsArray[0][i][j];
					// 	bRow.appendChild(td);
					// }
					// tBody.appendChild(bRow)
					for (var j = 0; j < ccount; j++) {
						var td = document.createElement("td");
						var anchor = document.createElement("button");
						var node = document.createTextNode(jsArray[0][i][j]);
						anchor.setAttribute("id",jsArray[0][i][0]);
						anchor.setAttribute("value",jsArray[0][i][0]);
						anchor.setAttribute("class","btn btn-outline-primary");
						anchor.onclick = function just_a_temp_function(){
							//console.log(document.getElementById(this.id).value);
							Storing_rollno_for_single_report(document.getElementById(this.id).value);
						};
						//anchor.setAttribute("onclick",loadDetails(jsArray[0][i][0]));
// Im searching for a solution
						console.log("I am Here 4");
						anchor.appendChild(node);
						td.appendChild(anchor);
						// document.getElementById(jsArray[0][i][0]).addEventListener("Click",function(){
						// 	alert(jsArray[0][i][0]);
						// });

						// anchor.href = "https://www.youtube.com/";
						//anchor.href = "trythird.html";
						//anchor.target = "_blank";
						console.log("I am Here Now 5");
						//td.innerHTML = jsArray[0][i][j];
						bRow.appendChild(td);
					}
					tBody.appendChild(bRow)
			}
			table.appendChild(tBody);

		});
	});
}
		//var count = new Array(getRowColCount(strUser,sdate,fdate));
		//alert(typeof(count));
		//count = getRowColCount(strUser,sdate,fdate);
		//alert(count);
		/*eel.getRowColCount(strUser,sdate,fdate)(function(ret){
		//var count = ret;
		//sessionStorage.setItem("rccount",count)
		//alert(typeof(count));
		//alert(ret);
		var rcount = ret[0];								//row count
		var ccount = ret[1];								//column count
		var presentcount;
		var absentcount;
		var presentArray = new Array();
		var absentArray = new Array();
		var percentageArray = new Array();
		for(j=2;j<ccount;j++)								//logic for calculating no of present and absent and class attendance percentage
		{
			presentcount = 0;
			absentcount = 0;
		for(i=1;i<rcount;i++)
		{
			if(jsArray[0][i][j] == 'Present')
				presentcount +=1;
			else
				absentcount +=1;
		}
			presentArray.push(presentcount);
			absentArray.push(absentcount);
			percentageArray.push(Math.floor(((presentcount)/(absentcount+presentcount))*10000)/100);
			//Math.floor(num * 100) / 100
		}
		//alert(presentArray + " " + absentArray + " " + percentageArray);
		//alert(jsArray[0][0][0]);
		var table = document.getElementById("myTable");
		for(j=0;j<rcount;j++)
		{
  		var row = table.insertRow(j);
  		for(i=0;i<ccount;i++){
  			var cell1 = row.insertCell(i);
  			//var cell2 = row.insertCell(1);
  			cell1.innerHTML = jsArray[0][j][i];
  			//cell2.innerHTML = "NEW CELL2";
  		}
  		}
	});
	});
}*/




function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";

//document.getElementById('sdate').innerHTML = sdate;
//document.getElementById('fdate').innerHTML = fdate;
document.getElementById("myList").innerHTML = "";
	eel.ShowCurrentlyPresent()(function(ret){
	//	console.log(ret);
		for (var i = 0; i < ret.length; ++i) {
      var node = document.createElement("LI");
      var textNode = document.createTextNode(ret[i]);
      node.appendChild(textNode);
      document.getElementById("myList").appendChild(node);
    };
	})
}
function writingexcel(){
	var e = document.getElementById("ListOfSubjects");
	var strUser = e.options[e.selectedIndex].value;
	eel.WritingInExcel(strUser)(function(){console.log("written");});
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

function dropTable(){
	eel.DropTable()(function(ret){
		document.getElementById('dropTable').href = "login.html";
	});
}
