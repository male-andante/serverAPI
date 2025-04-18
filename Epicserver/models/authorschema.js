import mongoose from "mongoose"


const authorSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
    lastname: { type: 'string', required: true },
    email: { type: 'string', required: true },
    avatar: { type: 'string', required: true },
    birthday: { type: 'string', required: true }

})  // così definisco che forma deve avere l'autore.

const authorModel = mongoose.model('Authors', authorSchema)

export default authorSchema