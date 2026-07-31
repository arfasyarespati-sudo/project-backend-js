const express = require('express');
const app = express()
const hostname = '127.0.0.1';
const port = 3000;

const quotes = [
  {id: 1, text: "test1", author: "Anonymus"},
  {id: 2, text: "test2", author: "Yaok"},
  {id: 3, text: "test3", author: "Enkripsi"}
];



app.get('/', (req, res) => {
  res.send('hello from express');
})

app.get('/api/quote', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json(quotes[randomIndex]);
});

app.listen(port, () => {
  console.log(`the server is running at ${hostname}:${port}`)
})