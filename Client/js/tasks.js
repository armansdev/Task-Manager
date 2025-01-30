const API_BASE_URL = "http://localhost:5500/api/tasks";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html"; // Redirect if not logged in
}

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

// Fetch all tasks
async function fetchTasks() {
  try {
    const response = await fetch(API_BASE_URL, { headers });
    const tasks = await response.json();
    displayTasks(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Display all the Tasks
function displayTasks(tasks) {
  const tasksList = document.getElementById("tasks-list");
  tasksList.innerHTML = "";

  tasks.forEach((task) => {
    const dueDate = task.dueDate.split("T")[0];
    const taskItem = document.createElement("div");
    taskItem.className = "task-card";
    taskItem.innerHTML = `
              <h3>${task.title}</h3>
              <p>${task.description}</p>
              <p><strong>Due Date:</strong> ${dueDate}</p>
              <p><strong>Status:</strong> ${task.status}</p>
              <p><strong>Priority:</strong> ${task.priority}</p>
              <button onclick="editTask('${task._id}')">Edit</button>
              <button onclick="deleteTask('${task._id}')">Delete</button>
          `;
    tasksList.appendChild(taskItem);
  });
}

// Edit a task
async function editTask(id) {
  const newTitle = prompt("Enter new title:");
  const newDesc = prompt("Enter new description:");
  const newDueDate = prompt("Enter new due date:");
  const newStatus = prompt("Enter current status:");

  if (newTitle && newDesc) {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          dueDate: newDueDate,
          status: newStatus,
        }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }
}

// Delete Task
async function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE", headers });
    fetchTasks();
  }
}

// Logout
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// Display add-task modal
const modal = document.getElementById("task-modal");
const closeBtn = document.querySelector(".close");
const addTaskBtn = document.getElementById("add-task-btn");

addTaskBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Handle task form
document.getElementById("task-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;
  const priority = document.getElementById("task-priority").value;
  const dueDate = document.getElementById("task-dueDate").value;

  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, priority, dueDate }),
    });

    if (response.ok) {
      modal.style.display = "none";
      fetchTasks(); // Refresh the task list
    } else {
      alert("Error adding task");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

fetchTasks();
