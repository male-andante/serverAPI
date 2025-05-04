import {blogPostSchema, blogPostModel} from "../models/blogpostschema"


//CRUD posts

//GET All
server.get('/blogPosts', async (req, res) => {
    const blogPosts = await blogPostSchema.find()
    res.status(200).json(blogPosts)
})

//GET Authors Id
server.get('/blogPosts/:id', async (req, res) => { //per leggere dimanicamente il singolo id, lo metto come segnaposto :id
    const id = req.params.id  // definisco una variabile id che è dato dalla richiesta di leggere l'id presente nei parametri dell'oggetto.
    try {
        const blogPost = await blogPostSchema.findById(id) // cercami un oggetto che ha come Id => id
        res.status(200).json(blogPost)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


//POST
server.post('/blogPosts', async (req, res) => {
    const obj = req.body  // definisco un oggetto che è il body che richiedo al DB
    const blogPost = new blogPostModel(obj) // dico che lo user è l'oggetto con modello useModel
    const dbPost = await blogPost.save() // salvo quello che ho creato nel mio database
    res.status(201).json(dbPost)
})

//PUT
server.put('/blogPosts/:id', async (req, res) => {
    const id = req.params.id
    const obj = req.body
    try {
        const blogPostUpdate = await blogPostSchema.findByIdAndUpdate(id, obj)
        res.status(200).json(blogPostUpdate)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//DELETE
server.delete('blogPosts/:id', async (req, res) => {
    const id = req.params.id
    try {
        await blogPostSchema.findByIdAndDelete(id)
        res.status(200).json(message = 'post cancellato')
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


export default blogPostRoutes

