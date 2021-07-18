// Global variables
let addBtn = document.getElementById("add-btn"),
    textInput = document.getElementById("text-input"),
    tasksList = [];

init();

function init() {
    textInput.addEventListener("keyup", keyUp);
    textInput.setAttribute("autocomplete", "off");
    addBtn.classList.add("disabled");
    addBtn.addEventListener("click", addNewTask);
    initListclickEvent();

    moment.tz.setDefault("Asia/Calcutta");
}

function initListclickEvent() {
    let list = document.querySelectorAll('ul');
    list.forEach(element => {
        element.addEventListener('click', clicklistItem , false);
    });
}

function keyUp(ele) {
    let inputValue = textInput.value;
    if (inputValue.length === 0 || !inputValue.trim()) {
       addBtn.classList.add("disabled");
       return;
    }
 
    addBtn.classList.remove("disabled");
    if (ele.keyCode == 13) {
       addNewTask(inputValue);
    }
 }

 function addNewTask(inputValue) {
    let inputObj = createNewTaskByID(inputValue);
    addNewTaskNode(inputObj, "todo-task-list", true);
    addToTaskList(inputObj);
    textInput.value = "";
    addBtn.classList.add("disabled");
 }

 // Create a new list item when clicking on the "Add" button
function addNewTaskNode(inputObj, section, setFocus) {
    let li = document.createElement("li"),
    textSpan = document.createElement("SPAN"),
    txt = document.createTextNode(inputObj.value);

    textSpan.appendChild(txt);
    li.appendChild(textSpan);
    document.getElementById(section).appendChild(li);
  
    let closeSpan = document.createElement("SPAN"),
    closetxt = document.createTextNode("\u00D7");
    closeSpan.className = "close";
    closeSpan.appendChild(closetxt);
    if (inputObj["completed"])
        li.classList.add("checked");
    li.appendChild(closeSpan);
    li.id = inputObj.id;
 
    if (setFocus) {
       let objDiv = document.getElementById("list-container");
       objDiv.scrollTop = objDiv.scrollHeight;
    }
 
    closeSpan.onclick = function() {
       let div = this.parentElement;
       deleteNode(div.innerText);
    }
 }

 function clicklistItem(ev) {
    if (ev.target.tagName === 'LI') {
       //console.log(ev.target)
       let id = ev.target.getAttribute("id"),
       task = getTaskByID(id);
       if (ev.target.classList.contains("checked")) {
            task["completed"] = false;
            ev.target.classList.remove('checked');
       } else {
            task["completed"] = true;
            ev.target.classList.add('checked');
       }
       renderList();
    }
 }

 function renderList() {
     let todolist = [],
     completedlist = [];
     todolist = tasksList.filter((task) => !task.completed),
     completedlist = tasksList.filter((task) => task.completed);
     document.getElementById("todo-task-list").innerHTML = "";
     document.getElementById("completed-task-list").innerHTML = "";
     if (completedlist.length > 0) 
        document.getElementById("completed-section").classList.remove("hidden");
    else
        document.getElementById("completed-section").classList.add("hidden");
     for (let i=0; i< todolist.length; i++ ) {
        addNewTaskNode(todolist[i], "todo-task-list", false);
     }
     for (let i=0; i< completedlist.length; i++ ) {
        addNewTaskNode(completedlist[i], "completed-task-list", false);
     }
 }

 function getTaskByID(id) {
     return tasksList.find((task) => task.id === id);
 }

 function createNewTaskByID(taskValue) {
    return {
      "id": moment().format("YYYY-MM-DD HH:mm:ss") + "/" + taskValue,
      "value": taskValue,
      "completed": false
   }
}

function addToTaskList(taskObj) {
    tasksList.push(taskObj);
    //console.log(tasksList);
    //setStorage(tasksList);
 }