$(document).ready(function(){
	$(".task").show();
	$("#subtask_set").hide();
	$("#todolist").hide();

});

function newTask() {

	inputvalue = document.getElementById("TaskName").value;

	 if (inputvalue === '') {
    alert("Please add a task name!");
  } else {
  	$("#subtask_set").show();
	}	
}


function listAdd() {

	inputval1 = document.getElementById("SubTaskName1").value;
	inputval2 = document.getElementById("SubTaskName2").value;
	inputval3 = document.getElementById("SubTaskName3").value;

	$("#todolist").append(inputval1);
	$("#todolist").append("<br>");

	$("#todolist").append(inputval2);

	$("#todolist").append("<br>");
	$("#todolist").append(inputval3);


	$("#todolist").show();


}