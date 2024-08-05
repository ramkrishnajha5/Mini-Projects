const list = document.querySelector(".todo-list input[type=text]");
const todoSection = document.querySelector(".todo-list");

todoSection.addEventListener("submit", function(event){
    event.preventDefault();
    const listValue = list.value;
    list.value = "";
    const listItem = document.createElement("li");

    //listing the todo in list item
    listItem.innerHTML = `<div class="list1 container">
                            <span class="todo-text">${listValue}</span>
                            <span><i class="fa-solid fa-circle-check icon"></i></span>
                        </div>

                        <div class="list2 container">
                            <button>Done</button>
                            <button>Delete</button>
                        </div>`
    document.querySelector(".list-items").prepend(listItem);
})
//for done undo
document.querySelector(".list-items").addEventListener("click",function(event){
    if(event.target.textContent === "Done"){
        event.target.parentNode.previousElementSibling.lastElementChild.firstElementChild.style.display = "inline";
        event.target.textContent = "Undo";
    }
    else if(event.target.textContent === "Delete"){
        event.target.parentNode.parentNode.remove();
    }
    else{
        event.target.parentNode.previousElementSibling.lastElementChild.firstElementChild.style.display = "none";
        event.target.textContent = "Done";
    }
})