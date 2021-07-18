// Global variables
let addBtn = document.getElementById("add-btn"),
    textInput = document.getElementById("text-input"),
    tasksList = [];

init();

function init() {
    let list = document.querySelector('ul');

    textInput.addEventListener("keyup", keyUp);
    textInput.setAttribute("autocomplete", "off");
    addBtn.classList.add("disabled");
    addBtn.addEventListener("click", addNewTask);
    list.addEventListener('click', clicklistItem , false);

    moment.tz.setDefault("Asia/Calcutta");
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
    addNewTaskNode(inputObj, true);
    addToTaskList(inputObj);
    textInput.value = "";
    addBtn.classList.add("disabled");
 }

 // Create a new list item when clicking on the "Add" button
function addNewTaskNode(inputObj, setFocus) {
    let li = document.createElement("li"),
    textSpan = document.createElement("SPAN"),
    txt = document.createTextNode(inputObj.value);

    textSpan.appendChild(txt);
    li.appendChild(textSpan);
    document.getElementById("task-list").appendChild(li);
  
    let closeSpan = document.createElement("SPAN"),
    closetxt = document.createTextNode("\u00D7");
    closeSpan.className = "close";
    closeSpan.appendChild(closetxt);
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
       console.log(ev.target)
       ev.target.classList.toggle('checked');

    }
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
    console.log(tasksList);
    //setStorage(tasksList);
 }