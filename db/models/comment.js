const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    commentedBy: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Comment  = new mongoose.model("Comment", commentSchema);

module.exports = Comment;