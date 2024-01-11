//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.
const newTaskInput = document.querySelector(".task__input_add");
const addTaskButton = document.querySelector(".task__button_add");
const todoTasksList = document.querySelector(".task-list_todo");
const completedTasksList = document.querySelector(".task-list_completed");

//New task list item
const createNewTaskElement = function (taskString) {

  const listItem = document.createElement("li");
  listItem.classList.add("task");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";

  const label = document.createElement("label");
  label.innerText = taskString;
  label.classList.add("task__label");

  const editInput = document.createElement("input");
  editInput.classList.add("task__input");

  const editButton = document.createElement("button");
  editButton.className = "task__button task__button_edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "task__button task__button_del";

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.setAttribute("alt", "remove image");
  deleteButtonImg.className = "task__del-img";

  deleteButton.appendChild(deleteButtonImg);

  editButton.innerText = "Edit";
  editButton.className = "task__button task__button_edit";

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

const addTask = function () {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  var listItem = createNewTaskElement(newTaskInput.value);

  //Append listItem to incompleteTaskHolder
  todoTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTaskInput.value = "";
}

//Edit an existing task.
var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector('.task__input');
  var label = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector(".task__button_edit");
  var containsClass = listItem.classList.contains("task_edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("task_edit-mode");
};

//Delete task.
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}

//Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  todoTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function () {
  console.log("AJAX Request");
}

//The glue to hold it all together.
//Set the click handler to the addTask function.
addTaskButton.onclick = addTask;
addTaskButton.addEventListener("click", addTask);
addTaskButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  const checkBox = taskListItem.querySelector(".task__checkbox");
  const editButton = taskListItem.querySelector(".task__button_edit");
  const deleteButton = taskListItem.querySelector(".task__button_del");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < todoTasksList.children.length; i++) {

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(todoTasksList.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksList.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
