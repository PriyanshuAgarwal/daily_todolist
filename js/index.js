
getStorage();
document.getElementById("add-btn").addEventListener("click", addNewTask);

let tasks = [];

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
   if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
   }
}, false);

function addNewTask() {
   let inputValue = document.getElementById("myInput").value;
   if (inputValue === '') 
      alert("You must write something!");
   addNewTaskNode(inputValue);
   addToTaskList(inputValue);
   document.getElementById("myInput").value = "";
}

// Create a new list item when clicking on the "Add" button
function addNewTaskNode(inputValue) {
   let li = document.createElement("li"),
   t = document.createTextNode(inputValue);
   li.appendChild(t);

   document.getElementById("task-list").appendChild(li);
 
   let span = document.createElement("SPAN"),
   txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);

   span.onclick = function() {
      let div = this.parentElement;
      deleteNode(div.innerText);
    }
}

function deleteNode(taskValue) {
   let value = taskValue.split("\n")[0];
   tasks = tasks.filter(task => task.name != value);
   document.getElementById("task-list").innerHTML = '';
   renderList(tasks);
}

function renderList(tasks) {
   for (let i=0; i< tasks.length; i++ ){
      addNewTaskNode(tasks[i].name);
   }
}

function addToTaskList(taskValue) {
   tasks.push({name: taskValue});
   setStorage();
}

function setStorage() {
   chrome.storage.sync.set({"tasks": tasks})
}

function getStorage() {
   chrome.storage.sync.get("tasks", (tasks) => {
      renderList(tasks["tasks"]);
   })
}

