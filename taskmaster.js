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

// Clear Add Item Text Field
function clearItemField() {
    item.value = "";
};

// Set Item Entry Focus
function setFocus() {
    item.focus();
}

// Add Items
addButton.addEventListener("click", function() {
    const itemTrim = item.value.trim();
    if (itemTrim != "") {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        const itemCheckbox = document.createElement("input");
        itemCheckbox.type = "checkbox";
        itemCheckbox.tabIndex = 0;
        const itemLabel = document.createElement("label");
        itemLabel.textContent = item.value;
        itemDiv.appendChild(itemCheckbox);
        itemDiv.appendChild(itemLabel);
        tasks.appendChild(itemDiv);
        clearItemField();
        setFocus();
        saveData();
    }
});

// Clear Items
clearButton.addEventListener("click", function() {
    if (tasks.firstChild != null) {
        const clearAlert = confirm("Are you sure you want to clear the list?");
        if (clearAlert == true) {
            while (tasks.firstChild) {
                tasks.removeChild(tasks.lastChild);
            };
        };
    };
});

// Save Local Data
function saveData() {
    localStorage.setItem("savedtasks", tasks);
};

// Load Local Data
function loadData() {
    tasks.innerHTML = localStorage.getItem("savedtasks");
}