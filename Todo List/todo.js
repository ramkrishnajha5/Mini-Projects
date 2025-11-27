const list = document.querySelector(".todo-list input[type=text]");
const todoSection = document.querySelector(".todo-list");
const listItems = document.querySelector(".list-items");
let currentPriority = "low";
let currentFilter = "all";

// Load saved items
let localStorageData = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : "";
listItems.innerHTML = localStorageData;
updateProgress();

// Priority selection
const priorityBtns = document.querySelectorAll(".priority-btn");
priorityBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        priorityBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        currentPriority = this.dataset.priority;
    });
});

// Filter buttons
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        filterBtns.forEach(b => b.classList.remove("active-filter"));
        this.classList.add("active-filter");
        currentFilter = this.dataset.filter;
        filterTodos();
    });
});

// Filter todos based on status
function filterTodos() {
    const todos = listItems.querySelectorAll("li");
    todos.forEach(todo => {
        const isDone = todo.querySelector(".todo-text").classList.contains("completed");

        if (currentFilter === "all") {
            todo.style.display = "flex";
        } else if (currentFilter === "completed" && isDone) {
            todo.style.display = "flex";
        } else if (currentFilter === "active" && !isDone) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
}

// Calculate and update progress
function updateProgress() {
    const todos = listItems.querySelectorAll("li");
    const completed = listItems.querySelectorAll(".todo-text.completed");

    if (todos.length === 0) {
        document.getElementById("progress-fill").style.width = "0%";
        document.getElementById("progress-text").textContent = "0% Complete";
        document.getElementById("progress-fill").textContent = "";
        return;
    }

    const percentage = Math.round((completed.length / todos.length) * 100);
    document.getElementById("progress-fill").style.width = percentage + "%";
    document.getElementById("progress-text").textContent = `${percentage}% Complete`;
    document.getElementById("progress-fill").textContent = `${completed.length}/${todos.length}`;
}

// Add todo
todoSection.addEventListener("submit", function (event) {
    event.preventDefault();
    const listValue = list.value.trim();

    if (!listValue) {
        return;
    }

    list.value = "";

    const listItem = document.createElement("li");
    listItem.setAttribute("data-priority", currentPriority);

    const timestamp = new Date().toLocaleString();

    // Create todo item HTML
    listItem.innerHTML = `
        <div class="list1 container">
            <span class="todo-text">${listValue}</span>
            <span><i class="fa-solid fa-circle-check icon"></i></span>
        </div>
        <div class="list2 container">
            <button>Done</button>
            <button>Delete</button>
        </div>
    `;

    listItems.prepend(listItem);
    updateProgress();
    filterTodos();
});

// Done/Undo and Delete actions
listItems.addEventListener("click", function (event) {
    const button = event.target;

    if (button.textContent === "Done") {
        const todoText = button.parentNode.previousElementSibling.querySelector(".todo-text");
        const icon = button.parentNode.previousElementSibling.querySelector(".icon");
        todoText.classList.add("completed");
        icon.style.display = "inline";
        button.textContent = "Undo";
        updateProgress();
        filterTodos();
    }
    else if (button.textContent === "Undo") {
        const todoText = button.parentNode.previousElementSibling.querySelector(".todo-text");
        const icon = button.parentNode.previousElementSibling.querySelector(".icon");
        todoText.classList.remove("completed");
        icon.style.display = "none";
        button.textContent = "Done";
        updateProgress();
        filterTodos();
    }
    else if (button.textContent === "Delete") {
        button.parentNode.parentNode.style.animation = "slideInRight 0.3s ease-out reverse";
        setTimeout(() => {
            button.parentNode.parentNode.remove();
            updateProgress();
        }, 300);
    }
});

// Reset and Save buttons
document.querySelector(".resetbtn").addEventListener("click", function (event) {
    if (event.target.classList.contains("reset") || event.target.closest(".reset")) {
        if (confirm("Are you sure you want to delete all todos?")) {
            listItems.innerHTML = "";
            localStorage.clear();
            updateProgress();
        }
    }
    else if (event.target.classList.contains("save") || event.target.closest(".save")) {
        localStorage.setItem("items", JSON.stringify(listItems.innerHTML));

        // Show save confirmation
        const saveBtn = event.target.closest(".save");
        const originalHTML = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
        saveBtn.style.background = "linear-gradient(135deg, #00ff88 0%, #00dd66 100%)";

        setTimeout(() => {
            saveBtn.innerHTML = originalHTML;
            saveBtn.style.background = "";
        }, 2000);
    }
});

// Auto-save on changes (every 30 seconds)
setInterval(() => {
    if (listItems.innerHTML !== localStorageData) {
        localStorage.setItem("items", JSON.stringify(listItems.innerHTML));
        localStorageData = listItems.innerHTML;
    }
}, 30000);