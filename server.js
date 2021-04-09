const express = require('express')
const app = express()
const port = 3000

const products = [
    {
        id: 1,
        type: 'Tröja',
        size: 'M'
    },
    {
        id: 2,
        type: 'Byxa',
        size: 'L'
    },
    {
        id: 3,
        type: 'Hoodie',
        size: 'S'
    }
]

app.use(express.static('public'))

app.use(express.json())

app.get("/api", (req, res) => {
    res.json(products)
})

app.get("/api/:id", (req, res) => {
    const id = req.params.id

    const foundProduct = products.find((product) => {
        return product.id == id
    })

    if(!foundProduct) {
        res.json({"Error": "Tröjan du söker finns inte." })
    }
    
    res.json(foundProduct)
})



app.listen(port, () => {
    console.log(`Server is on http://localhost:${port}`)
})