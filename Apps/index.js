console.log('Hello World!\n');
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'tasks.json');

function getTasks() {
  if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([]));
  }
  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

function addTask(desc) {
  const tasks = getTasks();
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1, desc,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`)
}

function updateTask(id, newDesc) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === parseInt(id));

  if (task) {
    task.desc = newDesc;
    task.updatedAt = new Date().toISOString;
    saveTasks(tasks);
    console.log(`Task (ID: ${id} updated successfully!)`);
  } else {
    console.log(`Taks with the ID ${id} is not found.`)
  }
}

function deleteTask(id) {
  let tasks = getTasks();
  const initialLength = tasks.length;
  console.log(initialLength + '\n');

  tasks = tasks.filter(t => t.id !== parseInt(id));

  if (tasks.length < initialLength) {
    saveTasks(tasks);
      console.log(`Task (ID: ${id}) has been deleted successfully!`);
  } else {
      console.log(`Task (ID: ${id} is not found.)`);
  }
}

function updateStatus(id, status) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === parseInt(id));

  if (task) {
    task.status = status;
    task.updatedAt = new Date().toISOString();
    saveTasks();
    console.log(`Task (ID: ${id}) marked status as ${status}.`);
  } else {
    console.log(`Task (ID: ${id}) is not found.`);
  }
}

function showList(filterStatus) {
  const tasks = getTasks();
  let filteredTasks = tasks;

  if (filterstatus) {
    filteredTasks = tasks.filter(t => t.status === filterStatus);
  }

  if (filteredTasks === 0) {
    console.log('No task found.');
    return;
  }

  console.log("ID | Status | Description | Created At");
  console.log("-------------------------------------------------");
    filteredTasks.forEach(t => {
        console.log(`${t.id} | [${t.status}] | ${t.description} | ${t.createdAt}`);
    });
}

showList

