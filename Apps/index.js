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

const tasks = getTasks();
console.log(tasks);