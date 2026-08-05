const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.json());



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

// Sample In-Memory Database
let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' }
];

// GET: Fetch all items
app.get('/api/items', (req, res) => {
  res.status(200).json(items);
});

// GET: Fetch single item by ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.status(200).json(item);
});

// POST: Create a new item
app.post('/api/items', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name parameter is required' });
  }

  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT: Update an existing item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  item.name = req.body.name || item.name;
  res.status(200).json(item);
});

// DELETE: Remove an item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  items = items.filter((i) => i.id !== id);
  res.status(200).json({ message: 'Item deleted successfully' });
});
// end of syntax