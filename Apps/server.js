const cors = require('cors')
const express = require('express');
const app = express();
const port = 3000;

app.use(cors())

app.use(express.json())




app.get('/', (req, res) => {
    res.send('hello from express')
})

app.get('/about', (req, res) => {
    res.send('this is the about page')
})

app.get('/contact', (req, res) => {
    res.send('this is the contact page')
})

app.get('/products', (req, res) => {
    res.json([
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Mouse', price: 300 }
    ])
})

app.get('/products/:id', (req, res) => {
    const id = Number((req.params.id))

    const products = [
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Mouse', price: 300 }
    ]
    const reqProduct = products.find((product) => product.id === id)
    res.json(reqProduct)
})

app.get('/message', (req, res) => {
    res.json({ message: "Hello from your backend"})
})

app.post('/message', (req, res) => {
    const { name, message } = req.body

    console.log('New message: ', name, message)
    res.json({ message: 'Thankyou for your message!'})
})

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}/`)
})



