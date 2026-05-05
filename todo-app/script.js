const storageKey = "task4.todo.items";

const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskButton = document.getElementById("addTaskButton");
const statusFilter = document.getElementById("statusFilter");
const clearCompletedButton = document.getElementById("clearCompletedButton");
const taskList = document.getElementById("taskList");
const taskMessage = document.getElementById("taskMessage");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = loadTasks();

function loadTasks() {
  const storedTasks = localStorage.getItem(storageKey);
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function createTask(title, priority) {
  return {
    id: Date.now(),
    title,
    priority,
    completed: false,
    createdAt: new Date().toLocaleString()
  };
}

function updateStats() {
  const completedCount = tasks.filter((task) => task.completed).length;
  totalTasks.textContent = String(tasks.length);
  completedTasks.textContent = String(completedCount);
  pendingTasks.textContent = String(tasks.length - completedCount);
}

function getVisibleTasks() {
  const filter = statusFilter.value;

  if (filter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  if (filter === "pending") {
    return tasks.filter((task) => !task.completed);
  }

  return tasks;
}

function renderTasks() {
  const visibleTasks = getVisibleTasks();
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskMessage.textContent = "Start by adding your first task.";
  } else if (visibleTasks.length === 0) {
    taskMessage.textContent = "No tasks match the selected filter.";
  } else {
    taskMessage.textContent = `${visibleTasks.length} task(s) shown from your saved list.`;
  }

  if (visibleTasks.length === 0) {
    taskList.innerHTML = '<li class="empty-state">Your task list is ready for the next update.</li>';
    updateStats();
    return;
  }

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " completed" : ""}`;

    item.innerHTML = `
      <input type="checkbox" aria-label="Toggle task completion" ${task.completed ? "checked" : ""}>
      <div class="task-main">
        <span class="task-title"></span>
        <div class="task-meta">
          <span class="pill ${task.priority.toLowerCase()}">${task.priority} Priority</span>
          <span>Created: ${task.createdAt}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="icon-button delete" type="button">Delete</button>
      </div>
    `;

    item.querySelector(".task-title").textContent = task.title;

    item.querySelector('input[type="checkbox"]').addEventListener("change", () => {
      tasks = tasks.map((savedTask) =>
        savedTask.id === task.id ? { ...savedTask, completed: !savedTask.completed } : savedTask
      );
      saveTasks();
      renderTasks();
    });

    item.querySelector(".delete").addEventListener("click", () => {
      tasks = tasks.filter((savedTask) => savedTask.id !== task.id);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(item);
  });

  updateStats();
}

function addTask() {
  const title = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (!title) {
    taskInput.focus();
    return;
  }

  tasks.unshift(createTask(title, priority));
  taskInput.value = "";
  saveTasks();
  renderTasks();
  taskInput.focus();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

statusFilter.addEventListener("change", renderTasks);
clearCompletedButton.addEventListener("click", clearCompletedTasks);

renderTasks();
