const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    subTitle: {
        type: String
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    desc: {
        type: String,
        require: true
    },
    postedBy: {
        id: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true
        }
    }

}, {timestamps: true});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;