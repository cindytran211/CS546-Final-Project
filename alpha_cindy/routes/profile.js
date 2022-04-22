const express=require('express');
const router=express.Router();
const data=require('../data');
const validation=require('../validation');
const theusers=data.users;

router.get('',async(req,res) =>
{
    const findUser=await theusers.findUser(req.session.userId);
    res.render('pages/profile',{firstName: findUser[0].firstname,lastName: findUser[0].lastname,email: findUser[0].email, 
        age: findUser[0].age, streetAddress: findUser[0].street, city: findUser[0].city, state: findUser[0].state, zipcode: findUser[0].zipcode, 
        mobilePhone: findUser[0].mobilephone,userId: req.session.userId,password: req.session.password});
});

router.post('',async(req,res)=>
{
    try{
        req.body.firstName=validation.checkFirstName(req.body.firstName);
        req.body.lastName=validation.checkLastName(req.body.lastName);
        req.body.streetAddress=validation.checkStreet(req.body.streetAddress);
        req.body.city=validation.checkCity(req.body.city);
        req.body.state=validation.checkState(req.body.state);
        req.body.zipcode=validation.checkZipcode(req.body.zipcode);
        req.body.mobilePhone=validation.checkPhoneNumber(req.body.mobilePhone);
        req.body.age=validation.checkAge(req.body.age);
        req.body.email=validation.checkEmail(req.body.email);
        req.body.userId=validation.checkUserName(req.body.userId);
        var password=req.body.password;
        password=validation.checkPassWord(password);
        const newUser=await theusers.updateUser(req.body.firstName,req.body.lastName,req.body.email,req.body.age,req.body.streetAddress,req.body.city,req.body.state,req.body.zipcode,req.body.mobilePhone,req.body.userId,req.body.password);
        if(!newUser)
        {
            res.status(500).send("Internal Server Error");
        }
        else
        {
            res.redirect('/auth');
        }
    }
    catch(e)
    {
        res.status(400).render('pages/profile',{error1:e});
    }
});

module.exports=router;