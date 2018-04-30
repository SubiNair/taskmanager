//On page load, run:
var showcompletedtasks = false;
$(document).ready(function(){

    //$(".task").show();
    $("#subtask_set").hide();
   // $("#todolist").hide();


    //listens for enter key on the text boxes
    $("#TaskName").keypress(function(e){if (e.which == 13){newTask();};});
    $("#TaskDue").keypress(function(e){if (e.which == 13){newTask();};});
    $("#SubTaskName1").keypress(function(e){if (e.which == 13){listAdd();};});
    $("#SubTaskDue1").keypress(function(e){if (e.which == 13){listAdd();};});
    $("#SubTaskName2").keypress(function(e){if (e.which == 13){listAdd();};});
    $("#SubTaskDue2").keypress(function(e){if (e.which == 13){listAdd();};});
    $("#SubTaskName3").keypress(function(e){if (e.which == 13){listAdd();};});
    $("#SubTaskDue3").keypress(function(e){if (e.which == 13){listAdd();};});
                            //create ul
    $('#todo-item-display-block').append("<ul id='todo-list'></ul>");

    //display default 3 items
    changeToDoDisplay(3); //display 3 to-do items by default

    //Function to display x number of todo items
    $("#todo-change-list-num").change(function(){
        updateItemsDisplayed();
    });

    //event listener to mark tasks complete
    //code for checking off items inspired by (and adapted to jquery) from https://www.w3schools.com/howto/howto_js_todolist.asp, under "// Add a "checked" symbol when clicking on a list item"
    //var list = document.querySelector('ul');
    $("#todo-list li").on('click',  function() { //got help from https://stackoverflow.com/questions/17715274/jquery-click-function-doesnt-work-after-ajax-call
        this.classList.toggle('checked'); //show that it's been marked complete
        //actually mark complete in todo so it doesn't show up on refresh
        //alert($(this).text());
        markComplete($(this).text());

    });
});


//Sample Data
var todoitems = [
    {
        "todoID": 1,
        "subtaskID": 0, //0 means it is the main task
        "descriptor": "Write paper for class",
        "due_date": "2018-05-20",
        "complete": false
    },
    {
        "todoID": 1,
        "subtaskID": 1, //0 means it is the main task
        "descriptor": "Research topic",
        "due_date": "2018-05-04",
        "complete": false
    },
    {
        "todoID": 1,
        "subtaskID": 2, //0 means it is the main task
        "descriptor": "Write outline",
        "due_date": "2018-05-12",
        "complete": false
    },
    {
        "todoID": 2,
        "subtaskID": 0, //0 means it is the main task
        "descriptor": "Clean my house",
        "due_date": "2018-05-01",
        "complete": false
    },
    {
        "todoID": 3,
        "subtaskID": 0, //0 means it is the main task
        "descriptor": "Schedule flight home",
        "due_date": "2018-06-01",
        "complete": false
    },
    {
        "todoID": 4,
        "subtaskID": 0, //0 means it is the main task
        "descriptor": "Email professor",
        "due_date": "2018-05-02",
        "complete": false
    },
];

//Function to get next task ID
function getnextID(){
    index = 0;
    $.each(todoitems, function(n, elem){ //key returns the todoID
        if (elem.todoID > index){
            index = elem.todoID;
        };
    });
    return index+1;
};

//Function to sort array by due Date
function sortToDoByDate(item1, item2){
    //alert(item1.due_date - item2.due_date);
    var duedate1 = Date.parse(item1.due_date);
    var duedate2 = Date.parse(item2.due_date);
    return duedate1 - duedate2;
};

//Mark an item complete
function markComplete(todoText){
    $.each(todoitems, function(n, elem) {
        if (elem.descriptor == todoText){
            elem.complete = true;
            //alert(elem.complete);
        }
    });
};

//function to display todo items that have been completed
function showComplete(){
    $.each(todoitems, function(n, elem){
        if ((elem.complete == true)){
            //alert(elem.complete);
           $("#todo-list").append("<li class='checked'><big>" + elem.descriptor + "</big>");
            if (elem.subtaskID != 0){ //show what the subtask's main ID is if it is a subtask
                $("#todo-list").append(" (Subtask " + elem.subtaskID + " of Task ID " + elem.todoID + "), ");
            }
            else{
                $("#todo-list").append(" (Task ID " + elem.todoID + "), ");
            }
            $("#todo-list").append("Due Date: " + elem.due_date + "</li>");
            count = count+1;
        };
    });
};

//function to display desired number of items on task list
function updateItemsDisplayed(){
    $('li').empty(); //remove all items
        var numtodisplay;
        if ($('#todo-change-list-num').val() == "All"){
            numtodisplay = todoitems.length;
        }
        else {
            numtodisplay = parseInt($('#todo-change-list-num').val());
        }
        changeToDoDisplay(numtodisplay);
};


//Function to display todo items based on input
function changeToDoDisplay(total_count){

    //sort the data by due date
    var array = todoitems.sort(sortToDoByDate);

    //got help for appending list items from: https://stackoverflow.com/questions/886570/creating-unordered-list-in-a-div

    var count = 0;
    $.each(array, function(n, elem) {
        if ((count < total_count) && (elem.complete == false)){ //until 3 items are displayed or no options left on list
            var addtext = "<li><big>" + elem.descriptor + "</big>";
            if (elem.subtaskID != 0){ //show what the subtask's main ID is if it is a subtask
                addtext = addtext +"<font color='red'> (Subtask " + elem.subtaskID + " of Task ID " + elem.todoID + "), ";
            }
            else{
                addtext = addtext + " (Task ID " + elem.todoID + "), ";
            }
            $("#todo-list").append(addtext + "Due Date: " + elem.due_date + "</li>");
            count = count+1;
        };
    });
    //$('#todo-item-display-block').append("</ul>");
};


function newTask() {

	inputvalue = document.getElementById("TaskName").value;

	 if (inputvalue === '') {
    alert("Please add a task name!");
  } else {
  	$("#subtask_set").show();
	}
};


function listAdd() {

    var maintask = document.getElementById("TaskName").value;
    var maindue = document.getElementById("TaskDue").value;
    var subtask1 = document.getElementById("SubTaskName1").value;
    var subdue1 = document.getElementById("SubTaskDue1").value;
    var subtask2 = document.getElementById("SubTaskName2").value;
    var subdue2 = document.getElementById("SubTaskDue2").value;
    var subtask3 = document.getElementById("SubTaskName3").value;
    var subdue3 = document.getElementById("SubTaskDue3").value;

    //add tasks to the todolist array
    var newtaskID = getnextID();
    var newsubtaskID = 0; //always starts with 0

    //add main task
    todoitems.push( {
        "todoID": newtaskID,
        "subtaskID": newsubtaskID,
        "descriptor": maintask,
        "due_date": maindue,
        "complete": false
    });


    //add subtasks if relevent
    if (subtask1 != ""){
        newsubtaskID = newsubtaskID + 1;
        todoitems.push( { //append to todoitems
            "todoID": newtaskID,
            "subtaskID": newsubtaskID,
            "descriptor": subtask1,
            "due_date": subdue1,
            "complete": false
        });
    };
    if (subtask2 != ""){
        newsubtaskID = newsubtaskID + 1;
        todoitems.push( { //append to todoitems
            "todoID": newtaskID,
            "subtaskID": newsubtaskID,
            "descriptor": subtask2,
            "due_date": subdue2,
            "complete": false
        });
    };if (subtask3 != ""){
        newsubtaskID = newsubtaskID + 1;
        todoitems.push( { //append to todoitems
            "todoID": newtaskID,
            "subtaskID": newsubtaskID,
            "descriptor": subtask3,
            "due_date": subdue3,
            "complete": false
        });
    };

    alert("Task '" + maintask + "' and " + newsubtaskID + " subtasks added. Display all tasks if you can't see it");


};
