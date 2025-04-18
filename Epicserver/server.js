// const express = require('express')
// const cors = require('cors') 
// const mongoose = require('mongoose')

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import "dotenv/config"
import connectDB from './connectdb.js'


const server = express()

// Middleware
server.use(express.json())
server.use(cors())

//Definizione modello dato del DB
const userSchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    lastname: {type: 'string', required: true},
    email: {type: 'string', required: true},
    avatar: {type: 'string', required: true},
    birthday: {type: 'string', required: true}
    
})  // così definisco che forma deve avere il dato.

const userModel = mongoose.model('Users', userSchema)

//CRUD

//GET All
server.get('/authors', async (req, res) =>{ 
    const users = await userModel.find()
    res.status(200).json(users)
})

//GET Authors Id
server.get('/users/:id', async (req, res)=>{ //per leggere dimanicamente il singolo id, lo metto come segnaposto :id
    const id = req.params.id  // definisco una variabile id che è dato dalla richiesta di leggere l'id presente nei parametri dell'oggetto.
    try{
        const user = await userModel.findById(id) // cercami un oggetto che ha come Id => id
        res.status(200).json(user)
    }catch (err) {
        res.status(500).json({error: err.message})
    }
})


//POST
server.post('/authors', async (req, res)=>{
    const obj = req.body  // definisco un oggetto che è il body che richiedo al DB
    const user = new userModel(obj) // dico che lo user è l'oggetto con modello useModel
    const dbUser = await user.save() // salvo quello che ho creato nel mio database
    res.status(201).json(dbUser)
})

//PUT
server.put('/authors/:id', async (req, res)=>{
    const id = req.params.id
    const obj = req.body
    try{
        const userUpdate = await userModel.findByIdAndUpdate(id, obj)
        res.status(200).json(userUpdate)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

//DELETE
server.delete('authors/:id', async(req, res)=>{
    const id = req.params.id
    try{
        await userModel.findByIdAndDelete(id)
        res.status(200).json(message = 'utente cancellato')
    }catch (err) {
        res.status(500).json({error: err.message})
    }
})


server.listen(process.env.PORT, () => {  // .listen è il metodo che accende il server su una porta.
console.log(`Node app listening on port ${process.env.PORT}`) })

connectDB()


