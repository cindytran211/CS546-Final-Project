const express=require('express');
const router=express.Router();
const data=require('../data');
const validation=require('../validation');
const theusers=data.users;

router.get('',async(req,res) =>
{
    const deleteUser=await theusers.deleteUser(req.session.userId);
    req.session.views=undefined;
    res.clearCookie('AuthCookie');
    res.render('pages/delete');
});

module.exports=router;