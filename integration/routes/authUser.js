const express=require('express');
const router=express.Router();
const data=require('../data');
const validation=require('../validation');
const theusers=data.users;

router.get('', async(req,res) =>{
    res.render('pages/authUser',{userId: req.session.user});
});

module.exports=router;