
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
	var dropDown = document.getElementById('dropdown'), subjectArray = [], i;
            for (i = 0; i < dropDown.options.length ; i += 1) {
                if (dropDown.options[i].selected) {
                    subjectArray.push( dropDown.options[i].value); 
                    //subjectArray.push({ Name: dropDown.options[i].text, Value: dropDown.options[i].value });
                }
            }
            //for(i=0;i<subjectArray.length;i++)
            //	alert(subjectArray[i]);
	eel.UserSignupFunction(identity,name,pass,subjectArray)(function(ret){alert("Successfully SignedUP");});
}



function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
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
