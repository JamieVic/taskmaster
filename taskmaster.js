const itemsForm = document.getElementById("itemForm");
const addButton = document.getElementById("addItem");
const item = document.getElementById("itemText");
const clearButton = document.getElementById("clearItems");
const tasks = document.getElementById("listItems");

// Prevent Form Submission, Load Local Storage
document.addEventListener("readystatechange", function(event) {
    if (event.target.readyState === "complete") {
        itemsForm.addEventListener("submit", function(event2) {
            event2.preventDefault();
        });
    };
    loadData();
});

// Save Local Data
function saveData() {
    localStorage.setItem("savedtasks", tasks.innerHTML);
};

// Load Local Data
function loadData() {
    tasks.innerHTML = localStorage.getItem("savedtasks");
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
        const itemLabel = document.createElement("label");
        itemLabel.textContent = item.value;
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
};

// Clear All Items
clearButton.addEventListener("click", function() {
    if (tasks.firstChild != null) {
        const clearAlert = confirm("Are you sure you want to clear the list?");
        if (clearAlert == true) {
            while (tasks.firstChild) {
                tasks.removeChild(tasks.lastChild);
            };
        };
    };
    saveData();
});
