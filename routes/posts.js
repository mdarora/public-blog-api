const router = require('express').Router();
const loginAuth = require("../middleware/loginAuth");

const Post = require('../db/models/post');

router.post("/add-post", loginAuth, async (req, res) => {
    const {title, subTitle, slug, desc} = req.body;

    if (!title || !slug || !desc) {
        return res.json({error: "All fields are required!"});
    } else if (slug.includes(" ")) {
        return res.json({error: "slug must not include blank spaces!"});
    }

    try {
        const findBySlug = await Post.findOne({slug: slug});
        if(findBySlug){
            return res.json({error: "Slug is already exist. it must be unique."});
        }
        const newPost = new Post({
            title, subTitle, slug, desc,
            postedBy: {
                id: req.id,
                name: req.name,
                username: req.username
            }
        });

        await newPost.save();
        return res.json({message: "Post added."});
        
    } catch (error) {
        console.log("Chatched on add-post route : ",error);
        return res.json({error: "Something went wrong!"});
    }
});


module.exports = router;