// const express = require('express')
// const cors = require('cors') 
// const mongoose = require('mongoose')

import express from 'express'
import cors from 'cors'
//import mongoose from 'mongoose'
import "dotenv/config"
import connectDB from './connectdb.js'
import {authorSchema, authorModel} from './models/authorschema.js'
import {blogPostSchema, blogPostModel} from './models/blogpostschema.js'
// import blogPostRoutes from './routes/authorsroutes.js'
// import authorsRoutes from './routes/authorsroutes.js'
import multer from 'multer'

const server = express()

// Middleware
server.use(express.json())
server.use(cors())


//CRUD Autori

//GET All
server.get('/authors', async (req, res) => {
    const authors = await authorSchema.find()
    res.status(200).json(authors)
})

//GET Authors Id
server.get('/authors/:id', async (req, res) => { //per leggere dimanicamente il singolo id, lo metto come segnaposto :id
    const id = req.params.id  // definisco una variabile id che è dato dalla richiesta di leggere l'id presente nei parametri dell'oggetto.
    try {
        const author = await authorSchema.findById(id) // cercami un oggetto che ha come Id => id
        res.status(200).json(author)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


//POST
server.post('/authors', async (req, res) => {
    const obj = req.body  // definisco un oggetto che è il body che richiedo al DB
    const author = new authorModel(obj) // dico che lo user è l'oggetto con modello useModel
    const dbAuthor = await author.save() // salvo quello che ho creato nel mio database
    res.status(201).json(dbAuthor)
})

//PUT
server.put('/authors/:id', async (req, res) => {
    const id = req.params.id
    const obj = req.body
    try {
        const authorUpdate = await authorSchema.findByIdAndUpdate(id, obj)
        res.status(200).json(authorUpdate)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//DELETE
server.delete('authors/:id', async (req, res) => {
    const id = req.params.id
    try {
        await authorSchema.findByIdAndDelete(id)
        res.status(200).json(message = 'autore cancellato')
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})





server.listen(process.env.PORT, () => {  // .listen è il metodo che accende il server su una porta.
    console.log(`Node app listening on port ${process.env.PORT}`)
})

connectDB()


