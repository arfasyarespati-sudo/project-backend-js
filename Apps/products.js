const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json([
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Mouse', price: 300 }
    ])
})

router.get('/special', (req, res) => {
    const specialProduct = {
        name: 'Javascript course',
        price: 999
    }
    res.json(specialProduct)
})

router.get('/:id', (req, res) => {
    const id = Number((req.params.id))

    const products = [
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Mouse', price: 300 }
    ]
    const reqProduct = products.find((product) => product.id === id)
    res.json(reqProduct)
})



router.post('/', (req, res) => {
    const { name, price } = req.body
    const newProduct = {
        name,
        price
    }
    console.log(newProduct)
    res.json({ message: "New product added!", product: newProduct})
})
module.exports = router