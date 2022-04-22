const express=require('express');
const router=express.Router();
const data=require('../data');
const validation=require('../validation');
const theusers=data.users;

router.get('', async(req,res) =>{
    res.render('pages/auth',{userId: req.session.userId});
});

module.exports=router;