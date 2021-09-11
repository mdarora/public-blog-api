const router = require('express').Router();
const loginAuth = require("../middleware/loginAuth");

const Comment  = require('../db/models/comment');

router.post("/add-comment", loginAuth, async (req, res) => {
    const {postId, comment} = req.body;

    if (!comment) {
        return res.json({error: "Comment is required!"});
    } else if (!postId) {
        return res.json({error: "PostId is required!"});
    }

    try {
        const newComment = new Comment({
            postId,comment,
            commentedBy: {
                id: req.id, name: req.name, username: req.username
            }
        });

        await newComment.save();

        res.json({message: "commented.", newComment});
        
    } catch (error) {
        console.log("Catched on add-comment route : ",error);
        return res.json({error: "Something went wrong!"});
    }
});

router.get("/comments/:postId", loginAuth, async (req, res) => {
    try {
        const comments  = await Comment.find({postId: req.params.postId}).sort({createdAt: -1});
        if(comments.length === 0){
            return res.json({error: "No comments found."});
        }
        
        return res.json({comments});
    } catch (error) {
        console.log("Catched on comments/:postId route : ",error);
        return res.json({error: "Something went wrong!"});
    }
});

router.delete("/comment/:id", loginAuth, async (req, res) => {
    try {
        const findComment = await Comment.findOne({_id:req.params.id});
        if(!findComment){
            return res.json({error: "Invalid request!"});
        } else if (findComment.commentedBy.id !== req.id){
            return res.json({error: "You can only delete your own comments."});
        }
        await findComment.delete();

        return res.json({message: "Comment deleted."});
    } catch (error) {
        console.log("Catched on (delete)comments/:id route : ",error);
        return res.json({error: "Something went wrong!"});
    }
});

module.exports = router;