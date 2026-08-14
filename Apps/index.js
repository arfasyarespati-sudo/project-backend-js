#!/usr/bin/env node

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

  if (filterStatus) {
    filteredTasks = tasks.filter(t => t.status === filterStatus);
  }

  if (filteredTasks === 0) {
    console.log('No task found.');
    return;
  }

  console.log("No |ID | Status | Description | Created At");
  console.log("-------------------------------------------------");
    filteredTasks.forEach((t, index) => {
        console.log(`${index + 1} | ${t.id} | [${t.status}] | ${t.desc} | ${t.createdAt}`);
    });
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'add':
        if (!args[1]) return console.log("Error: Task description is required.");
        addTask(args[1]);
        break;
    case 'update':
        if (!args[1] || !args[2]) return console.log("Error: Task ID and new description are required.");
        updateTask(args[1], args[2]);
        break;
    case 'delete':
        if (!args[1]) return console.log("Error: Task ID is required.");
        deleteTask(args[1]);
        break;
    case 'mark-in-progress':
        if (!args[1]) return console.log("Error: Task ID is required.");
        updateStatus(args[1], 'in-progress');
        break;
    case 'mark-done':
        if (!args[1]) return console.log("Error: Task ID is required.");
        updateStatus(args[1], 'done');
        break;
    case 'list':
        showList(args[1]); // args[1] bisa 'done', 'todo', 'in-progress', or undefined
        break;
    default:
        console.log("Invalid command. Available commands: add, update, delete, mark-in-progress, mark-done, list");
}





