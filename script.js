var todos = [];
var editflag = false;
var j, id ;

function main(){

    var leftPaneDiv = document.createElement("div");
    leftPaneDiv.setAttribute("id","left");
    
    var heading1 = document.createElement("h1");
    heading1.innerHTML = "TASK LIST";
    heading1.style.textAlign = "center";
    leftPaneDiv.appendChild(heading1);
    
    var para = document.createElement("p");
    para.innerHTML = "Add tasks to your list by typing to the right and pressing enter. You may then view pending tasks below.";
    para.style.textAlign = "-webkit-center";
    para.style.padding = "0px 10px";
    leftPaneDiv.appendChild(para);
    
    
    var rightPaneDiv = document.createElement("div");
    rightPaneDiv.setAttribute("id","right");
    
    var textArea = document.createElement("textarea");
    textArea.setAttribute("class","text");
    rightPaneDiv.appendChild(textArea);
    textArea.setAttribute("placeholder", "I need to...");
    textArea.style.fontSize = "45px";
    textArea.style.padding = "30px 10px 0px 30px";
    textArea.setAttribute("id", "box");
    
    document.body.appendChild(leftPaneDiv);
    document.body.appendChild(rightPaneDiv);
    
    
    
    textArea.addEventListener("keydown",eventHandler);

}

main();


function deleteItem(e){
    var x = e.target.parentNode.parentNode;
    var value = e.target.parentNode.parentNode.getElementsByTagName('p')[0].innerHTML;
    // console.log(e.target.parentNode.parentNode);

    for(var i =0; i<todos.length; i++){
        if(todos[i][0] === value){
            todos.splice(i,1);
            break;
        }
    }

    localStorage.setItem("todos",JSON.stringify(todos));

    var leftPaneDiv = document.getElementById("left");
    leftPaneDiv.removeChild(x);
}

function replaceVal(e){
    editflag = true;
    id = e.target.parentNode.parentNode;
    var value = id.getElementsByTagName('p')[0].innerHTML;
    // console.log(e.target.parentNode.parentNode);
    
    for(var i = 0; i<todos.length; i++){
        if(todos[i][0] === value){
            j = i;
            break;
        }
    }

    var inputElement = document.getElementById("box");
    inputElement.value = value;
    

}


function checkBoxClicked(e) {
    
    var x = e.target.parentNode.parentNode.getElementsByTagName("p")[0];

    var i =0;
    for(; i<todos.length; i++){
        
        if(todos[i][0] === x.innerHTML  )
        {
            break;
        }
    }
    if(e.target.checked === true )
    {
        todos[i][1] = true;
        x.style.textDecoration = "line-through";

    }
    else{
        todos[i][1] = false;
        x.style.textDecoration = "";
    }

    localStorage.setItem("todos",JSON.stringify(todos));
    
}



function eventHandler(event){

    var arrLen = todos.length;
    var Code = event.code;
    var inputElement = document.getElementById("box");
    var value = inputElement.value;
    var flag = false;
    console.log(value, value.length);
    if(Code == "Enter" && value.length >1  &&  editflag !== true){
        var temp = [];
        
        for(var i =0; i<arrLen; i++){
            if(todos[i][0] === value){
                flag = true;
                break;
            }
        }

        if(flag){
            alert("Already Data Exist");
            inputElement.value = "";
            event.preventDefault();
        }
        else{ 
            // event.preventDefault();
            
            var leftdiv = document.createElement("div");
            leftdiv.setAttribute("class", "leftdiv");
            
            var divpara = document.createElement("p");
            divpara.style.paddingLeft = "10px";
            
            var leftdivButton = document.createElement("div");
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type","checkbox");
            var checkid = "check" + arrLen;
            checkbox.setAttribute("id", checkid);
            checkbox.style.padding = "10";
            
            var edit = document.createElement("i");        //<i class="fa fa-pencil" style="font-size:16px"></i>
            edit.setAttribute("class","fa fa-pencil");
            edit.style.fontSize = "16px";
            edit.style.padding = "10";
            edit.style.paddingRight = "0";
            
            var deleteButton = document.createElement("i");
            deleteButton.setAttribute("class", "fa fa-trash-o");
            deleteButton.style.fontSize = "16px";
            deleteButton.style.padding = "10";

            
            leftdivButton.append(checkbox);
            leftdivButton.append(edit);
            leftdivButton.append(deleteButton);
            // leftdivButton.append(edit);
            
            leftdiv.append(divpara);
            leftdiv.append(leftdivButton); 
            
            
            divpara.innerHTML = value;
            
            temp.push(value);
            temp.push(false);
            todos.push(temp);
            localStorage.setItem("todos",JSON.stringify(todos));
            
            
            var leftPaneDiv = document.getElementById("left");
            leftPaneDiv.append(leftdiv);
            
            inputElement.value = "";
            event.preventDefault();
            
            checkbox.addEventListener('click', checkBoxClicked);        
            edit.addEventListener("click",replaceVal);        
            deleteButton.addEventListener("click",deleteItem);
            
        }
    }
    else if(Code == "Enter" && value.length >1 && editflag) {
        

        for(var i =0; i<arrLen; i++){

            if(todos[i][0] === value && i !== j){
                flag = true;
                break;
            }
        }

        if(flag){
            alert("Already Data Exist");
            inputElement.value = "";
            event.preventDefault();
        }
        else{ 
            event.preventDefault();
            todos[j][0] = value;
            todos[j][1] = false;
            id.getElementsByTagName('p')[0].innerHTML = value;
            id.getElementsByTagName('p')[0].style.textDecoration = "none";
            var x = id.getElementsByTagName('p')[0].parentNode;
            x = x.getElementsByTagName("div")[0].getElementsByTagName("input")[0]; 
            x.checked = false;
            localStorage.setItem("todos",JSON.stringify(todos));
            editflag = false;
            inputElement.value = "";

        }
        
    }
    else if(Code == "Enter" && value <=1){
        alert("Enter some data");
        inputElement.value = "";
        event.preventDefault();
    }
}

let storedTodos = localStorage.getItem("todos");

if(storedTodos !== null){
    todos = JSON.parse(storedTodos);
} 

todos.forEach(function(value,i) {
        
        var leftdiv = document.createElement("div");
        
        var divpara = document.createElement("p");
        divpara.style.paddingLeft = "10px";

        var leftdivButton = document.createElement("div");
        leftdiv.setAttribute("class", "leftdiv");
        
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");        
        var checkid = "check" + i;
        checkbox.setAttribute("id", checkid);
        checkbox.style.padding = "10";
        
        var edit = document.createElement("i");        //<i class="fa fa-pencil" style="font-size:16px"></i>
        edit.setAttribute("class","fa fa-pencil");
        edit.style.fontSize = "16px";
        edit.style.padding = "10";
        edit.style.paddingRight = "0";
        
        var deleteButton = document.createElement("i");
        deleteButton.setAttribute("class", "fa fa-trash-o");
        deleteButton.style.fontSize = "16px";
        deleteButton.style.padding = "10";
        
        leftdivButton.append(checkbox);
        leftdivButton.append(edit);
        leftdivButton.append(deleteButton);
        // leftdivButton.append(edit);
        
        divpara.innerHTML = value[0];
       
        
        
        leftdiv.append(divpara);
        leftdiv.append(leftdivButton);         
        
        
        checkbox.addEventListener('click', checkBoxClicked);
        edit.addEventListener("click",replaceVal);        
        deleteButton.addEventListener("click",deleteItem);
        
        
        var leftPaneDiv = document.getElementById("left");
        
        leftPaneDiv.append(leftdiv);
        if(value[1] === true){
            checkbox.checked = true;
            divpara.style.textDecoration = "line-through";
            // checkBoxClicked(divpara)
        }
});