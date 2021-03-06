$(document).ready(function(){
	var employeeArray = []; //store all employees
	$('#employeeInfo').on('submit',function(event){
		event.preventDefault();
		
		var personObj = {};
		$.each($('#employeeInfo').serializeArray(), function(i, field){
			personObj[field.name] = field.value;
		});

		//check to see if salary is valid
		var parsedNumber = parseFloat(parseFloat(personObj.salary).toFixed(2));
		if( !(typeof parsedNumber === 'number' && !isNaN(parsedNumber)) ){ //if parsedNumber === number and also != NaN
			alert("please leave out nonnumeric characters in the salary field");
		} else if (personObj.idNumber===""){
			alert("The employee ID Number cannot be blank.");
		}

		else{

			personObj.salary = parsedNumber;
			employeeArray.push(personObj); // add person to employee array
			$('[type=text]').val(''); // reset form
			makePersonDiv(personObj); //make a div for the personObj and throw it on the DOM.
		}

		$('#totalSalary').text(calcTotalSalary(employeeArray)); //display total monthly salary
	});


	$('#employeeData').on('click', 'button', function(event){  //remove employees button
		for (var i = 0, x = employeeArray.length; i < x;i++){
			if ($(this).parent().data("test")==employeeArray[i].idNumber){//is the clicked employee id the same as 
				employeeArray.splice(i,1);								  //the id of employeeArray[i]?
			}
		}
		//console.log(employeeArray);
		$('#totalSalary').text(calcTotalSalary(employeeArray));  //recalculate total salary
		$(this).parent().remove();	//remove person from the DOM
	});
	$('#employeeData').on('mouseenter mouseleave', 'button', function(event){  //
		console.log('mouseover');
		$(this).toggleClass('buttonMouseover');
	});

	$('[type=submit]').click();
});

function makePersonDiv (personObj){
	$('#employeeData').append('<div class="person" data-test="'+personObj.idNumber+ '"></div>');
	var $personDiv = $('#employeeData').children().last();

	//console.log($personDiv.data("test"));
	
	$personDiv.append('<p>' + personObj.firstName + '</p>');
	$personDiv.append('<p>' + personObj.lastName + '</p>');
	$personDiv.append('<p>$' + personObj.salary.toFixed(2) + '</p>');
	$personDiv.append('<p>' + personObj.idNumber + '</p>');
	$personDiv.append('<p>' + personObj.jobTitle + '</p>');
	$personDiv.append('<button class="deleteButton"> X </button>');
}

function calcTotalSalary(employeeArray){
	var counter = 0;
	for (var i=0, x = employeeArray.length; i<x; i++){
		counter += parseFloat((employeeArray[i].salary)/12);
	}
	return ('$'+counter.toFixed(2));
}