// const express = require('express')
// const cors = require('cors') 
// const mongoose = require('mongoose')

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import "dotenv/config"
import connectDB from './connectdb.js'


const app = express()
const dbName = 'EpicCrud'

// Middleware
app.use(express.json())
app.use(cors())

//Definizione modello dato del DB
const userSchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    lastname: {type: 'string', required: true},
    phone: {type: 'number', required: true},
    email: {type: 'string', required: true}
})  // così definisco che forma deve avere il dato.

const userModel = mongoose.model('Users', userSchema)

//CRUD

//GET All
app.get('/users', async (req, res) =>{ 
    const users = await userModel.find()
    res.status(200).json(users)
})

//GET Authors Id
app.get('/users/:id', async (req, res)=>{ //per leggere dimanicamente il singolo id, lo metto come segnaposto :id
    const id = req.params.id  // definisco una variabile id che è dato dalla richiesta di leggere l'id presente nei parametri dell'oggetto.
    try{
        const user = await userModel.findById(id) // cercami un oggetto che ha come Id => id
        res.status(200).json(user)
    }catch (err) {
        res.status(500).json({error: err.message})
    }
})


app.listen(process.env.PORT, () => {  // .listen è il metodo che accende il server su una porta.
console.log(`Node app listening on port ${process.env.PORT}`) })

connectDB()


