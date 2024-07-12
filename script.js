const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const statusLabel = document.getElementById("status-label");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        let emoji = document.createElement("span");
        emoji.innerHTML = "😊";
        emoji.classList.add("emoji");
        li.appendChild(emoji);
        listContainer.appendChild(li);
        inputBox.value = "";
        saveData();
        updateStatusLabel();
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        e.target.querySelector('.emoji').style.display = e.target.classList.contains("checked") ? "inline-block" : "none";
        saveData();
        updateStatusLabel();
    } else if (e.target.tagName === "SPAN" && e.target.innerHTML === "\u00d7") {
        e.target.parentElement.remove();
        saveData();
        updateStatusLabel();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    let listItems = document.querySelectorAll("li");
    listItems.forEach(li => {
        if (li.classList.contains("checked")) {
            li.querySelector('.emoji').style.display = "inline-block";
        }
    });
    updateStatusLabel();
}

function updateStatusLabel() {
    let totalTasks = listContainer.getElementsByTagName('li').length;
    let checkedTasks = listContainer.getElementsByClassName('checked').length;

    if (totalTasks > 0) {
        if (checkedTasks > totalTasks / 2) {
            statusLabel.innerHTML = "Good";
            statusLabel.style.display = "block";
        } else if (checkedTasks > totalTasks / 4) { // Change condition for "Bad"
            statusLabel.innerHTML = "Bad";
            statusLabel.style.display = "block";
        } else {
            statusLabel.style.display = "none";
        }
    } else {
        statusLabel.style.display = "none";
    }
}

showTask();
