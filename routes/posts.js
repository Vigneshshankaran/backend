const express = require('express');
const router = express.Router();
const Post = require('../models/posts')

router.get('/gets', async(req, res) =>{
    try{
        const posts = await Post.find();
        res.json(posts)
    }catch(err){
        res.json({message:err});
    }
});

router.post('/post' , async(req, res)=>{
    const post = new Post({

   name: req.body.name,
   phone: req.body.phone,
   address: req.body.address,
   city: req.body.city,
   state: req.body.state,
   zip: req.body.zip,
   country: req.body.country,
   email: req.body.email,
   price: req.body.price,
   position: req.body.position,
   website: req.body.website,
   photo: req.body.photo,
   skill: req.body.skill,
   bio: req.body.bio
    })
   try {
  const savedPost = await post.save();
   
    res.json(savedPost)
} catch (err) {
    res.json({message:err});
   }

})
router.get('/:postId', async(req, res) =>{
    try {
        const post = await post.findById(req.params.postId);
         
          res.json(post)
      } catch (err) {
          res.json({message:err});
         }
})

router.delete('/:postId', async(req, res) =>{
   try {
    const removedPost = await Post.findOneAndDelete({_id: req.params.postId})     
      res.json(removedPost)
  } catch (err) {
      res.json({message:err});
     }
})
router.get('/:postId', async(req, res) =>{
   
    try {
     const updatedPost = await Post.updateOne({_id: req.params.postId})    
     {$set:{title: req.body.title}} 
       res.json(updatedPost)
   } catch (err) {
       res.json({message:err});
      }
 })
module.exports = router;
