let containerArray = [1,2,3,4,5,6,7,8,9,10];

const html = containerArray.map( item =>{
    return `<div class="item-list">
       conatiner ${item}
    </div>` ; 
   });
   
   document.getElementById("single1").innerHTML = html.join('');

dragula([single1], {
    removeOnSpill: true
});
