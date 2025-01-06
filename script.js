class specialSidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="top">
            <div class="logo">
                <i class="bx bxl-codepen"></i>
                <span>To-Do List</span>
            </div>
            <i class="bx bx-menu" id="btn"></i>
        </div>
        <div class="user">
            <img src="./assets/profile-pic.png" alt="Logo Picture" class="logo-img">
            <div>
                <p class="bold">Created By</p>
                <p>Francisco Diaz</p>
            </div>
        </div>
        <ul>
            <li>
                <a href="index.html">
                    <i class="bx bx-home-alt"></i>
                    <span class="nav-item">Dashboard</span>
                </a>
                <span class="tooltip">Dashboard</span>
            </li>
            <li>
                <a href="add-task.html">
                    <i class="bx bx-list-check"></i>
                    <span class="nav-item">Add Task</span>
                </a>
                <span class="tooltip">Add Task</span>
            </li>
            <li>
                <a href="labels.html">
                    <i class="bx bx-flag"></i>
                    <span class="nav-item">Labels</span>
                </a>
                <span class="tooltip">Labels</span>
            </li>
            <li>
                <a href="about.html">
                    <i class="bx bx-info-circle"></i>
                    <span class="nav-item">About</span>
                </a>
                <span class="tooltip">About</span>
            </li>
        </ul>
        `;
    }
}

customElements.define('special-sidebar', specialSidebar);

const form = document.querySelector('#task-form');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskName = document.querySelector('#task-input').value;
        const priority = document.querySelector('#priority').value;
        const dueDate = document.querySelector('#due-date').value;
        const dueTime = document.querySelector('#due-time').value;

        if (!taskName || !priority) {
            alert("Please fill in all required fields.");
            return;
        }

        const task = {
            taskName,
            priority,
            dueDate,
            dueTime,
            completed: false,
        };

        saveTask(task);
        form.reset();

        window.location.href = "index.html"; // redirect to dashboard after submitting
    });
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const today = new Date().toISOString().split('T')[0];

    const dueTodayTable = document.querySelector('.task-table__due-today tbody');
    const allTasksTable = document.querySelector('.task-table__all-tasks tbody');


    if (!dueTodayTable || !allTasksTable) {
        console.error("Tables not found.");
        return;
    }

    dueTodayTable.innerHTML = '';
    allTasksTable.innerHTML = '';
    

    tasks.forEach((task, index) => {
        const rowHTML = `
            <tr data-index="${index}" class="${task.completed ? 'completed' : ''}">
                <td>${task.priority}</td>
                <td>${task.taskName}</td>
                <td>${task.dueDate}</td>
                <td>${task.dueTime}</td>
            </tr>
        `;

        allTasksTable.insertAdjacentHTML('beforeend', rowHTML);

        if (task.dueDate === today) {
            const dueTodayRowHTML = `
                <tr data-index="${index}" class="${task.completed ? 'completed' : ''}">
                    <td>${task.priority}</td>
                    <td>${task.taskName}</td>
                    <td>${task.dueTime}</td>
                </tr>
            `;
            dueTodayTable.insertAdjacentHTML('beforeend', dueTodayRowHTML);
        }

      
    });

    applyRowEventListeners(); // Reapply event listeners
    
}

function loadLabelTask() {      
    console.log("Loading Label Tasks...");
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const lowPrioTable = document.querySelector('.left-table tbody');
    const midPrioTable = document.querySelector('.middle-table tbody');
    const highPrioTable = document.querySelector('.right-table tbody');

    if (!lowPrioTable || !midPrioTable || !highPrioTable) {
        console.error("Tables not found.");
        return;
    }

    // Clear existing content
    lowPrioTable.innerHTML = '';
    midPrioTable.innerHTML = '';
    highPrioTable.innerHTML = '';

    // Loop through tasks and insert rows
    tasks.forEach((task, index) => {
        const labelRowHTML = `
            <tr data-index="${index}" class="${task.completed ? 'completed' : ''}">
                <td>${task.priority}</td>
                <td>${task.taskName}</td>
            </tr>
        `;

        switch (task.priority.toLowerCase()) {
            case 'low':
                lowPrioTable.insertAdjacentHTML('beforeend', labelRowHTML);
                break;
            case 'med':
                midPrioTable.insertAdjacentHTML('beforeend', labelRowHTML);
                break;
            case 'high':
                highPrioTable.insertAdjacentHTML('beforeend', labelRowHTML);
                break;
            default:
                console.warn("Unknown priority:", task.priority);
        }
    });

    applyRowEventListeners(); // Reapply event listeners

}

document.addEventListener('DOMContentLoaded', function() {
    loadLabelTask();
});

// Add event listeners for double-click and status toggle
function applyRowEventListeners() {
    const rows = document.querySelectorAll('.task-table__all-tasks tbody tr, .task-table__due-today tbody tr, .left-table tbody tr, .middle-table tbody tr, .right-table tbody tr');
    
    rows.forEach((row) => {
        let clickTimer;

        // Single-click to toggle status
        row.addEventListener('click', () => {
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                toggleStatus(row.dataset.index);
            }, 170);
        });

        // Double-click to delete task
        row.addEventListener('dblclick', () => {
            clearTimeout(clickTimer);
            deleteTask(row.dataset.index);
        });
    });
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    loadLabelTask();
}

function toggleStatus(index){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    loadTasks();
    loadLabelTask();
}

window.addEventListener('load', loadTasks);
