import mongoose from "mongoose"


const blogPostSchema = new mongoose.Schema(
    {
        category: { type: 'string', required: true },
        title: { type: 'string', required: true },
        cover: { type: 'string', required: true },
        readTime: {
            value: { type: 'number', required: true },
            unit: { type: 'number', required: true }
        },
        author: { type: 'string', required: true },
        content: { type: 'string', required: true }

    })  // così definisco che forma deve avere il post.

const blogPostModel = mongoose.model('blogPost', blogPostSchema)

export default {blogPostSchema, blogPostModel}