//getStorage();
moment.tz.setDefault("Asia/Calcutta");
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", addNewTask);
addBtn.classList.add("disabled");
let textInput = document.getElementById("text-input")
textInput.addEventListener("keyup", keyUp);
textInput.setAttribute("autocomplete", "off");

let tasksList = [];
let firstItemAdded = false;

function firstTimeLoad() {
   let sampleTasks = [{"name": "Hit the gym"}, {"name": "Pay electricity bills"}];
   renderList(sampleTasks);
}


function keyUp(ele) {
   let inputValue = document.getElementById("text-input").value;
   if (inputValue.length === 0 || !inputValue.trim()) {
      addBtn.classList.add("disabled");
      return;
   }

   addBtn.classList.remove("disabled");
   if (ele.keyCode == 13) {
      addNewTask();
   }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click',clicklistItem , false);


function clicklistItem(ev) {
   if (ev.target.tagName === 'LI') {
      console.log(ev.target)
      ev.target.classList.toggle('checked');

   }
}

function isDuplicate(inputValue) {
  let index = tasksList.findIndex(task => task.name === inputValue);
  return(index == -1 ?  false: true);
}

function addNewTask() {
   let inputValue = document.getElementById("text-input").value;
   if (inputValue.length === 0 || !inputValue.trim())  return;
   addNewTaskNode(inputValue, true);
   addToTaskList(inputValue);
   document.getElementById("text-input").value = "";
   addBtn.classList.add("disabled");
}

// Create a new list item when clicking on the "Add" button
function addNewTaskNode(inputValue, setFocus) {
   let li = document.createElement("li"),
   t = document.createTextNode(inputValue);
   li.appendChild(t);
   document.getElementById("task-list").appendChild(li);
 
   let span = document.createElement("SPAN"),
   txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);

   if (setFocus) {
      let objDiv = document.getElementById("list-container");
      objDiv.scrollTop = objDiv.scrollHeight;
   }

   span.onclick = function() {
      let div = this.parentElement;
      deleteNode(div.innerText);
   }
}

function deleteNode(taskValue) {
   let value = taskValue.split("\n")[0];
   tasksList = tasksList.filter(task => task.name != value);
   document.getElementById("task-list").innerHTML = '';
   renderList(tasksList);
   setStorage(tasksList);
}

function renderList(tasks) {
   for (let i=0; i< tasks.length; i++ ){
      addNewTaskNode(tasks[i].name);
   }
}

function addNewTaskByID(taskValue) {
    return {
      "id": moment().format("YYYY-MM-DD HH:mm:ss") + "/" + taskValue,
      "value": taskValue,
      "completed": false
   }
}

function addToTaskList(taskValue) {
   tasksList.push(addNewTaskByID(taskValue));
   console.log(tasksList);
   setStorage(tasksList);
}


function setStorage(tasksList) {
   chrome.storage.sync.set({"tasks": tasksList})
}

//chrome.storage.sync.clear();
function getStorage() {
   chrome.storage.sync.get("tasks", (tasks) => {
      if (Object.keys(tasks).length !== 0) {
         //tasksList = tasks["tasks"];
         //renderList(tasks["tasks"]);
      } else {
         // TODO - render inital sample item
      }
      
   })
}

