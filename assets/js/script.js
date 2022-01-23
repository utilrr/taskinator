// var buttonEl = document.querySelector("#save-task");
// console.log(buttonEl);

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");




// 1 form handler function
var taskFormHandler = function(event) {
  event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput === "" || !taskTypeInput === "") {
      alert("You need to fill out the task form!");
      return false;
    }
    // formEl.reset();

    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    // check if task is new or one being edited by seeing if it has a data-task-id attribute
    var isEdit = formEl.hasAttribute("data-task-id");

  
    // package up data as an object
    // var taskDataObj = {
    //   name: taskNameInput,
    //   type: taskTypeInput
    // };
  
    // PUT THIS BELOW `var isEdit = ...` in `taskFormHandler()`

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
      };

      createTaskEl(taskDataObj);
    }
};


// 2 create task element function
var createTaskEl = function(taskDataObj) {
  // create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

// add task id as a custom attribute
listItemEl.setAttribute("data-task-id", taskIdCounter);

// create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
listItemEl.appendChild(taskInfoEl);


// create task actions (buttons & select) for task
var taskActionsEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEl);

// add entire list item to list
tasksToDoEl.appendChild(listItemEl);

// increase task counter for next unique id
taskIdCounter++;

}



// 3 create task actions function
var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  // Select element drop-down menu
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);


  // Status child <option> elements for the dropdown?
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

// run this in Console: createTaskActions(5)

  // Add a return statement to bottom of createTaskActions() function to see if it works in Console.
  return actionContainerEl;
};



// 4 complete edit task function
var completeEditTask = function(taskName, taskType, taskId) {
  // find the matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");
};


// 5 button handler function
var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } 
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};


// 6 status change handler function
var taskStatusChangeHandler = function(event) {
  // console.log(event.target);
  // console.log(event.target.getAttribute("data-task-id"));

    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
  

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

};


// 7 Edit task function
var editTask = function(taskId) {

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  // why did I have this written this way?
  // document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
  // update form's button to reflect editing a task rather than creating a new one
  formEl.querySelector("#save-task").textContent = "Save Task";
  
  };


// 8 Delete task function
var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

formEl.addEventListener("submit", taskFormHandler); 

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);