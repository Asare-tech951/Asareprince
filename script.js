// Get elements from the HTML page
const taskTitle = document.getElementById("taskTitle");
const taskSubject = document.getElementById("taskSubject");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasksContainer = document.getElementById("tasksContainer");

// Load previously saved tasks
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

// Save tasks in the browser
function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

// Display tasks on the website
function displayTasks() {
    tasksContainer.innerHTML = "";

    if (tasks.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No tasks yet. Add your first task!";
        message.id = "emptyMessage";
        tasksContainer.appendChild(message);
        return;
    }

    tasks.forEach(function(task) {

        const taskDiv = document.createElement("div");
        taskDiv.style.padding = "15px";
        taskDiv.style.borderBottom = "1px solid #ddd";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + task.subject;

        const status = document.createElement("p");
        status.textContent = task.completed
            ? "Status: Completed"
            : "Status: Incomplete";

        if (task.completed) {
            title.style.textDecoration = "line-through";
            status.style.color = "green";
        }

        // Complete or undo button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed
            ? "Undo"
            : "Mark Complete";

        completeBtn.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.backgroundColor = "red";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
        });

        taskDiv.appendChild(title);
        taskDiv.appendChild(subject);
        taskDiv.appendChild(status);
        taskDiv.appendChild(completeBtn);
        taskDiv.appendChild(deleteBtn);

        tasksContainer.appendChild(taskDiv);
    });
}

// Add a new task
addTaskBtn.addEventListener("click", function() {

    const title = taskTitle.value.trim();
    const subject = taskSubject.value.trim();

    if (title === "") {
        alert("Please enter a task title!");
        taskTitle.focus();
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        subject: subject || "General",
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskTitle.value = "";
    taskSubject.value = "";
});

// Display saved tasks when the page opens
displayTasks();