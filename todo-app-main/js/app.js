let input = document.querySelector(".input-el");
let add = document.querySelector(".input-btn");
let toDoDiv = document.querySelector(".todo");
let msg = document.getElementById("msg");

// array to store todo task
let addTaskArray = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// funtion to add task
add.onclick = function () {
     if (input.value !== "") {
       addTask(input.value); // Add Task To Array Of Tasks
       input.value = ""; // Empty Input Field
     }
   };

// Click On Task Element
toDoDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("delete")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTask(text) {
// Task Data
const task = {
     id: Date.now(),
     title: text,
     completed: false,
   };
   // Push Task To Array Of Tasks
   addTaskArray.push(task);
    // Add Tasks To Page
  addElementsToPageFrom(addTaskArray);
   // Add Tasks To Local Storage
  addDataToLocalStorageFrom(addTaskArray);
}

function addElementsToPageFrom(addTaskArray) {
  // Empty Tasks Div
  toDoDiv.innerHTML = "";
  // Looping On Array Of Tasks
  addTaskArray.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks Container
    toDoDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
 
  addTaskArray = addTaskArray.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(addTaskArray);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < addTaskArray.length; i++) {
    if (addTaskArray[i].id == taskId) {
      addTaskArray[i].completed == false ? (addTaskArray[i].completed = true) : (addTaskArray[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(addTaskArray);
}