const express=require('express');
const router=express.Router();
const data=require('../data');
const validation=require('../validation');
const theusers=data.users;

router.get('', async(req,res) =>
{
    if(req.session.views!=undefined)
    {
        res.redirect('/auth');
    }
    else
    {
        res.render('pages/login');
    }
});

router.post('',async(req,res) =>
{
    if(req.session.views!=undefined)
    {
        res.redirect('auth');
    }
    else try
    {
        req.body.userId=validation.checkUserName(req.body.userId);
        var password=req.body.password;
        password=validation.checkPassWord(password);
        const checkUser=await theusers.checkUser(req.body.userId,password);
        if(!checkUser.authenticated)
        {
            res.status(400).render('pages/login',{error1: "You did not provide a valid username and/or password"});
        }
        else
        {
            req.session.views=1;
            req.session.userId=req.body.userId;
            req.session.password=req.body.password;
            //res.render('pages/auth',{userId: req.session.store});
            return res.redirect('/auth');
        }
    }catch(e)
    {
        res.status(400).render('pages/login',{error: e});
    }
});

module.exports=router;