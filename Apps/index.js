const express = require('express');
const app = express()
const ip = '127.0.0.1';
const port = 3000;
app.get('/', (req, res) => {
  res.send('hello from express')
  res.send('yes how are you')
})

app.listen(port, () => {
  console.log(`the server is running at ${ip}:${port}`)
})