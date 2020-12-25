// Variables
const itemsForm = document.getElementById("itemForm");
const addButton = document.getElementById("addItem");
const item = document.getElementById("itemText");
const clearButton = document.getElementById("clearItems");
const tasks = document.getElementById("listItems");
const taskTitle = document.getElementById("taskHeading");
const thEditor = document.getElementById("headingEditor");
const thForm = document.getElementById("headingForm");
const searchTasks = document.getElementById("taskSearchbar");
const itemTags = tasks.getElementsByTagName("li");
const helpButton = document.getElementById("helpIcon");
const helpPage = document.getElementById("helpContainer");
const closeButton = document.getElementById("closeIcon");
const placeHolder = document.createElement("p");
    placeHolder.id = "listPlaceholder";
    placeHolder.innerHTML = "No tasks listed";

// Prevent Form Submission, Load Local Storage
window.addEventListener("load", function(event) {
    if (event.target.readyState === "complete") {
        itemsForm.addEventListener("submit", function(event2) {
            event2.preventDefault();
        });
    };
    loadData();
    noTasks();
});

// Save Local Data
function saveData() {
    localStorage.setItem("savedtasks", tasks.innerHTML);
    localStorage.setItem("savedheading", taskTitle.innerHTML);
};

// Load Local Data
function loadData() {
    tasks.innerHTML = localStorage.getItem("savedtasks");
    taskTitle.innerHTML = localStorage.getItem("savedheading");
};

// Clear Add Item Text Field
function clearItemField() {
    item.value = "";
};

// Set Item Entry Focus
function setFocus() {
    item.focus();
};

// Add Items
addButton.addEventListener("click", function() {
    const itemTrim = item.value.trim();
    if (itemTrim != "") {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        const itemLabel = document.createElement("li");
        itemLabel.textContent = item.value;
        itemLabel.setAttribute("ondblclick", "editItem(this)");
        const itemCheck = document.createElement("i");
        itemCheck.className = "fas fa-check";
        itemCheck.setAttribute("onclick", "strikeItem(this)");
        itemCheck.style.color = "green";
        itemCheck.title = "Completed";
        const clearItem = document.createElement("i");
        clearItem.className = "fas fa-times";
        clearItem.setAttribute("onclick", "delItem(this)");
        clearItem.style.color = "red";
        clearItem.title = "Delete";
        if (tasks.contains(placeHolder) == true) {
            placeHolder.remove();
        };
        itemDiv.appendChild(itemLabel);
        itemDiv.appendChild(itemCheck);
        itemDiv.appendChild(clearItem);
        tasks.appendChild(itemDiv);
        clearItemField();
        setFocus();
        saveData();
    };
});

// Strike An Item
function strikeItem(e) {
    if (e.previousSibling.style.textDecoration != "line-through") {
        e.previousSibling.style.textDecoration = "line-through";
        e.previousSibling.style.color = "grey";
    } else {
        e.previousSibling.style.textDecoration = "none";
        e.previousSibling.style.color = "rgb(45, 45, 45)";
    };
    saveData();
};

// Clear An Item
function delItem(e) {
    e.parentElement.remove();
    saveData();
    noTasks();
};

// Clear All Items
clearButton.addEventListener("click", function() {
    if (tasks.firstChild != placeHolder) {
        const clearAlert = confirm("Are you sure you want to clear the list?");
        if (clearAlert == true) {
            while (tasks.firstChild) {
                tasks.removeChild(tasks.lastChild);
            };
        };
    };
    saveData();
    noTasks();
});

// Edit Task Heading
taskTitle.addEventListener("click", function() {
    const currentTitle = taskTitle.innerHTML;
    taskTitle.style.display = "none";
    thEditor.style.display = "inline";
    thEditor.value = currentTitle;
    thEditor.focus();
});

// Save Task Heading
function savedTitle() {
    const newTitle = thEditor.value;
    taskTitle.innerHTML = newTitle;
    taskTitle.style.display = "block";
    thEditor.style.display = "none";
    saveData();
}

thForm.addEventListener("submit", function(e) {
    const thTrim = thEditor.value.trim();
    if (thTrim == '') {
        thEditor.value = "New List";
    }
    e.preventDefault();
    savedTitle();
});

thForm.addEventListener("focusout", function(e) {
    const thTrim = thEditor.value.trim();
    if (thTrim == '') {
        thEditor.value = "New List";
    }
    e.preventDefault();
    savedTitle();
});

// Filter Tasks
searchTasks.addEventListener("keyup", function() {
    for (let i = 0; i < itemTags.length; i++) {
        const searchValue = searchTasks.value;
        const itemLabels = itemTags[i].innerHTML;
        if (itemLabels.includes(searchValue) != true) {
            itemTags[i].parentElement.style.display = "none";
        } else {
            itemTags[i].parentElement.style.display = "";
        };
    };
});

// Edit Task
function editItem(e) {
    item.value = e.innerHTML;
    e.parentElement.remove();
    setFocus();
};

// Help Menu Controls
helpButton.addEventListener("click", function() {
    helpPage.style.display = "block";
});

closeButton.addEventListener("click", function() {
    helpPage.style.display = "none";
});

// No Tasks Placeholder
function noTasks() {
    if (tasks.innerHTML == "") {
        tasks.appendChild(placeHolder);
    };
};
