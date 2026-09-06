const cors = require('cors')
const express = require('express');
const productsRouter = require('./routes/products')
const app = express();
const port = 3000;

app.use(cors())

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use(express.json())

app.use('/products', productsRouter)

app.get('/', (req, res) => {
    res.send('hello from express')
})

app.get('/about', (req, res) => {
    res.send('this is the about page')
})

app.get('/contact', (req, res) => {
    res.send('this is the contact page')
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



