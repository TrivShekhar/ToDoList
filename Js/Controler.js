var closeSpan = document.getElementById("modalClose");
var modalContainer=document.getElementById("modalContainer");
var toDoList=document.getElementById("toDoList")

closeSpan.onclick=function(){
    modalContainer.style.display="none";
    }


function generateListItem() {
    var date= new Date;
    var ID = date.getTime();
    var inputValue = document.getElementById("inputfield").value;
    document.getElementById("emptyCase").style.display="none";
    var divnode = generateDiv(ID);
    divnode.appendChild(generateTextNode(inputValue,ID));
    divnode.appendChild(generateButtonNode(ID));
    divnode.appendChild(generateEditButtonNode(ID));
    divnode.appendChild(generateDoneButtonNode(ID));
    toDoList.appendChild(divnode);
}

function deleteToDo(value){

   var listDiv= document.getElementById("toDoList");
   var listElement = document.getElementById(value);
   listDiv.removeChild(listElement);
   if(toDoList.innerHTML==""){
    document.getElementById("emptyCase").style.display="block";
   }
}

function markDone(value){
    var listElement = document.getElementById(value);
    var buttonElement = document.getElementById("btn"+value);
    buttonElement.textContent="Undone";
    buttonElement.setAttribute("onclick","markUndone(this.value)");
    listElement.style.backgroundColor="green";
}

function markUndone(value){
    var listElement = document.getElementById(value);
    var buttonElement = document.getElementById("btn"+value);
    buttonElement.textContent="Done";
    buttonElement.setAttribute("onclick","markDone(this.value)");
    listElement.style.backgroundColor="transparent";
}

async function editToDo(value){
    var textElement = document.getElementById("para"+value);
    var text = textElement.textContent;
    getEditValue(text,textElement);
    
}

async function getEditValue(previousText,paraItem) {
    modalContainer.style.display="flex";
    var submitEdit = document.getElementById("submitEdit");
    var editInput = document.getElementById("editInput");
    var editedText = previousText;
    editInput.defaultValue=previousText;
    submitEdit.onclick =  function(){
        editedText = editInput.value;
        console.log(editedText);
        paraItem.textContent=editedText;
        modalContainer.style.display="none";
    }
}

function generateDiv(divId){
    var divnode = document.createElement("div");
    divnode.className="listDiv";
    divnode.setAttribute("id",divId);
    return divnode;
}

function generateButtonNode(ID){
    var buttonnode = document.createElement("button");
    buttonnode.setAttribute("value",ID);
    buttonnode.setAttribute("onclick","deleteToDo(this.value)");
    buttonnode.textContent="Delete";
    buttonnode.className="delete";
    return buttonnode;
}
function generateTextNode(inputValue,ID){
    var para = document.createElement("p");
    var textnode = document.createTextNode(inputValue);
    para.className="ToDoList";
    para.setAttribute("id","para"+ID);
    para.appendChild(textnode);
    return para;

}
function generateEditButtonNode(ID){
    var buttonnode = document.createElement("button");
    buttonnode.setAttribute("value",ID);
    buttonnode.setAttribute("onclick","editToDo(this.value)");
    buttonnode.textContent="Edit";
    buttonnode.className="edit";
    return buttonnode;
}

function generateDoneButtonNode(ID){
    var buttonnode = document.createElement("button");
    buttonnode.setAttribute("value",ID);
    buttonnode.setAttribute("id","btn"+ID);
    buttonnode.setAttribute("onclick","markDone(this.value)");
    buttonnode.textContent="Done!";
    buttonnode.className="markDone";
    return buttonnode;
}