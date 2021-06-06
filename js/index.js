let containerArray = [1, 2, 3, 4];

const html = containerArray.map(item => {
   return `<div class="item-list">
       conatiner ${item}
    </div>`;
});

document.getElementById("add-btn").addEventListener("click", newElement);

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
   if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
   }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
   var li = document.createElement("li");
   var inputValue = document.getElementById("myInput").value;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);
   if (inputValue === '') {
      alert("You must write something!");
   } else {
      document.getElementById("task-list").appendChild(li);
   }
   document.getElementById("myInput").value = "";

   var span = document.createElement("SPAN");
   var txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);

   for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
         var div = this.parentElement;
         div.style.display = "none";
      }
   }
}
//document.getElementById("ctn-list").innerHTML = html.join('');

//dragula([single1]);