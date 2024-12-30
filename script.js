function toggleStatus(circleElement){
    circleElement.classList.toggle("full");
    const row = circleElement.closest("tr");
    row.classList.toggle("completed");
}

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
                <p class="bold">Frank D.</p>
                <p>Admin</p>
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
                <a href="#labels">
                    <i class="bx bx-flag"></i>
                    <span class="nav-item">Labels</span>
                </a>
                <span class="tooltip">Labels</span>
            </li>
            <li>
                <a href="#about">
                    <i class="bx bx-info-circle"></i>
                    <span class="nav-item">About</span>
                </a>
                <span class="tooltip">About</span>
            </li>
        </ul>
    `
    }
}

customElements.define('special-sidebar', specialSidebar)