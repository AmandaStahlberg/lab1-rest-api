const express = require('express')
const app = express()
const port = 3000

const products = [
    {
        id: 1,
        type: 'Tröja',
        size: 'M',
        color: 'Blå'
    },
    {
        id: 2,
        type: 'Byxa',
        size: 'L',
        color: 'Röd'
    },
    {
        id: 3,
        type: 'Hoodie',
        size: 'S',
        color: 'Grön'
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
    if(!req.body.type || !req.body.size || !req.body.color) {
        res.status(404).json({"error": "type, size eller color finns inte eller är felstavat"})
        return
    }
    const typeToSave = req.body.type
    const sizeToSave = req.body.size
    const colorToSave = req.body.color

    let newIdToSave = 0
    for(const product of products) {
        if(product.id > newIdToSave) {
            newIdToSave = product.id
        }
    }
    newIdToSave++

    const newProduct = {
        id: newIdToSave,
        type: typeToSave,
        size: sizeToSave,
        color: colorToSave
    }

    products.push(newProduct)
    res.status(201).json(newProduct)
})

app.put("/api/products/:id", (req, res) => {
    const id = req.params.id

    const foundProduct = products.find((product) => {
        return product.id == id
    })

    // let newIdToSave = 0
    // for(const product of products) {
    //     if(product.id > newIdToSave) {
    //         newIdToSave = product.id
    //     }
    // }
    // newIdToSave++

    if(foundProduct) {
        foundProduct.type = req.body.type
        //foundProduct.id = newIdToSave
        foundProduct.size = req.body.size
        foundProduct.color = req.body.color
        res.status(200).json(foundProduct)
    } else if(!foundProduct) {
        res.status(404).json({"Error": "Det finns ingen produkt med detta id."})
    }
})

app.delete("/api/products/:id", (req, res) => {
    const id = req.params.id
    const product = products.find((product) => {
        return product.id == id
    })

    if(!product) {
        res.status(404).json({"Error": "kan inte hitta rätt produkt"})
        return
    }
    const index = products.indexOf(product)
    if(product.id == id) {
        products.splice(index, 1)
    }
    res.json({"Denna produkt är borttagen!": product})
})

app.listen(port, () => {
    console.log(`Server is on http://localhost:${port}`)
})

// kod som varit i delete4
    // const index = products.findIndex(p => p.id == req.params.id)
    // const deletedProduct = products.splice(index, 1)
    // res.json(deletedProduct)


    // IF SATS för att radera rätt produkt

    // app.delete('/api/favoritesweets/:id', (req, res) => {
    //     const index = myfavoritesweets.findIndex(p => p.id == p.id);
    //     let deletedProduct = myfavoritesweets.splice(index, 1);
        
    //     if(!myfavoritesweets.id) {
    //     res.status(404).json({"Error": "This sweet does not exist!"})
    //     }
        
    //     res.json(deletedProduct);
    //    });