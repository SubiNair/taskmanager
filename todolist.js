$(document).ready(function(){
	$(".task").show();
	$("#subtask_set").hide();

});

function newTask() {

	inputvalue = document.getElementById("TaskName").value;

	 if (inputvalue === '') {
    alert("Please add a task name!");
  } else {
  	$("#subtask_set").show();
	}	
}