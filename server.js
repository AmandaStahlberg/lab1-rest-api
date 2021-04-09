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

app.get("/api/products", (req, res) => {
    res.json(products)
})

app.get("/api/products/:id", (req, res) => {
    const id = req.params.id

    const foundProduct = products.find((product) => {
        return product.id == id
    })

    if(!foundProduct) {
        res.status(404).json({"Error": "Det finns ingen produkt med detta id." })
    }
    
    res.json(foundProduct)
})

app.post("/api/products", (req, res) => {
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

app.put("/api/products/:id", (req, res) => {
    const id = req.params.id

    const foundProduct = products.find((product) => {
        return product.id == id
    })

    if(!foundProduct) {
        res.status(404).json({"Error": "Det finns ingen produkt med detta id." })
    }
    
    foundProduct.type = req.body.type
    res.json({
        status: "en produkt är uppdaterad"
    })

    //res.json(product)
})

app.delete("/api/products/:id", (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id)
    const deletedProduct = products.splice(index, 1)
    res.json(deletedProduct)
    // const id = req.params.id

    // const product = products.find((product) => {
    //     return product.id == id
    // })
    // if(!product) {
    //     res.status(404).json({"Error": "kan inte hitta rätt produkt"})
    // }
    // const index = products.indexOf(product)
    // products.splice(index, 1)

    // res.json(product)
    
})

app.listen(port, () => {
    console.log(`Server is on http://localhost:${port}`)
})