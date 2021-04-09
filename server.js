const express = require('express')
const app = express()
const port = 3000

const products = [
    {
        id: 1,
        type: 'Tröja',
        //size: 'M'
    },
    {
        id: 2,
        type: 'Byxa',
        //size: 'L'
    },
    {
        id: 3,
        type: 'Hoodie',
        //size: 'S'
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
        res.json({"Error": "Det finns ingen produkt med detta id." })
    }
    
    res.json(foundProduct)
})

app.post("/api", (req, res) => {
    if(!req.body.type) {
        res.json({"Error": "Kan inte hitta typen."})
        return
    }
    const typeToSave = req.body.type

    let newIdToSave = 0
    for(const product of products) {
        newIdToSave = product.id
    }
    newIdToSave++

    products.push({
        id: newIdToSave,
        type: typeToSave
    })
    res.json({
        status: "En ny produkt är tillagd."
    })
})

app.listen(port, () => {
    console.log(`Server is on http://localhost:${port}`)
})