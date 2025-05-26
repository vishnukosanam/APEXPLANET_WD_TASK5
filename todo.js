const taskInput = document.getElementById("taskInput");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const filterStatus = document.getElementById("filterStatus");

let tasks = [];

function addTask() {
  const text = taskInput.value.trim();
  const start = startDateInput.value;
  const end = endDateInput.value;
  const priority = priorityInput.value;
  if (!text) return;
  tasks.push({
    text,
    start,
    end,
    priority,
    completed: false,
    created: new Date().toISOString()
  });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  startDateInput.value = "";
  endDateInput.value = "";
  priorityInput.value = "normal";
}

function renderTasks() {
  taskList.innerHTML = "";
  let filtered = tasks;
  if (filterStatus.value === "pending") filtered = tasks.filter(t => !t.completed);
  if (filterStatus.value === "completed") filtered = tasks.filter(t => t.completed);

  // Progress Bar
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  if (tasks.length > 0) {
    const completed = tasks.filter(t => t.completed).length;
    const percent = Math.round((completed / tasks.length) * 100);
    progressBar.style.width = percent + "%";
    progressText.textContent = `${completed} of ${tasks.length} tasks completed (${percent}%)`;
  } else {
    progressBar.style.width = "0%";
    progressText.textContent = "No tasks yet";
  }

  if (filtered.length === 0) {
    taskList.innerHTML = "<li style='color:#888;text-align:center;'>No tasks found.</li>";
    return;
  }

  filtered.forEach((task, idx) => {
    const li = document.createElement("li");
    li.style.borderLeft = task.priority === "high" ? "4px solid #e53935" : task.priority === "low" ? "4px solid #43a047" : "4px solid #3f87a6";
    li.style.opacity = task.completed ? "0.6" : "1";
    li.innerHTML = `
      <span style="font-weight:600;">${task.text}</span>
      <span style="font-size:0.95em;color:#888;margin-left:8px;">
        ${task.start ? `Start: ${task.start}` : ""} ${task.end ? `End: ${task.end}` : ""}
      </span>
      <span style="font-size:0.95em;color:#1976d2;margin-left:8px;">[${task.priority}]</span>
      <i class="fa fa-check" title="Mark as done" style="margin-left:10px;cursor:pointer;" onclick="toggleComplete(${tasks.indexOf(task)})"></i>
      <i class="fa fa-edit" title="Edit" style="margin-left:10px;cursor:pointer;" onclick="editTask(${tasks.indexOf(task)})"></i>
      <i class="fa fa-trash" title="Delete" style="margin-left:10px;cursor:pointer;" onclick="deleteTask(${tasks.indexOf(task)})"></i>
    `;
    taskList.appendChild(li);
  });
}

function toggleComplete(idx) {
  tasks[idx].completed = !tasks[idx].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(idx) {
  if (confirm("Delete this task?")) {
    tasks.splice(idx, 1);
    saveTasks();
    renderTasks();
  }
}

function editTask(idx) {
  const task = tasks[idx];
  const newText = prompt("Edit task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function clearAllTasks() {
  if (confirm("Clear all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
}

function filterTasks() {
  renderTasks();
}

loadTasks();
renderTasks();