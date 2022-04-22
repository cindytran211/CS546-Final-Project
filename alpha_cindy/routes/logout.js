const express=require('express');
const router=express.Router();
const data=require('../data');
const validation=require('../validation');
const theusers=data.users;

router.get('',async(req,res)=>
{
    req.session.views=undefined;
    res.clearCookie('AuthCookie');
    res.render('pages/logout');
});

module.exports=router;