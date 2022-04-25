const express=require('express');
const router=express.Router();
const data=require('../data');
const validation=require('../validation');
const theusers=data.users;

router.get('',async(req,res)=>
{
    if(req.session.views!=undefined)
    {
        //res.render('pages/auth',{userId: req.session.store});
        res.redirect('auth');
    }
    else
    {
        res.render('pages/signup');
    }
});

router.post('', async(req,res) =>
{
    if(req.session.views!=undefined)
    {
        res.redirect('auth');
    }
    else try
    {
       req.body.firstname=validation.checkFirstName(req.body.firstname);
       req.body.lastname=validation.checkLastName(req.body.lastname);
       req.body.street=validation.checkStreet(req.body.street);
       req.body.city=validation.checkCity(req.body.city);
       req.body.state=validation.checkState(req.body.state);
       req.body.zipcode=validation.checkZipcode(req.body.zipcode);
       req.body.phonenumber=validation.checkPhoneNumber(req.body.phonenumber);
       req.body.age=validation.checkAge(req.body.age);
       req.body.email=validation.checkEmail(req.body.email);
       req.body.userId=validation.checkUserName(req.body.userId);
       var password=req.body.password;
       password=validation.checkPassWord(password);
       const newUser=await theusers.createUser(req.body.firstname,req.body.lastname,req.body.email,req.body.age,req.body.street,req.body.city,req.body.state,req.body.zipcode,req.body.phonenumber,req.body.userId,req.body.password);
       if(!newUser.userInserted)
       {
          res.status(500).send("Internal Server Error");
       }
       else
       {
          res.redirect('/login');
       }
    }
    catch(e)
    {
        res.status(400).render('pages/signup',{error1:e});
    }
});

module.exports=router;