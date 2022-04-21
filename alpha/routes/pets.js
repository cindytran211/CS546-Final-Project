const express=require('express');
const router=express.Router();
const data=require('../data');
const validation=require('../validation');
const theusers=data.users;

router.get('/',async(req,res) =>
{
    if(req.session.views!=undefined)
    {
        res.redirect('/auth');
    }
    else
    {
        res.redirect('/login')
    }
});

router.get('/login', async(req,res) =>
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

router.get('/signup',async(req,res)=>
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

router.post('/signup', async(req,res) =>
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

router.post('/login',async(req,res) =>
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
        console.log("hi");
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

router.get('/auth', async(req,res) =>{
    res.render('pages/auth',{userId: req.session.userId});
});

router.get('/logout',async(req,res)=>
{
    req.session.views=undefined;
    res.clearCookie('AuthCookie');
    res.render('pages/logout');
});

router.get('/delete',async(req,res) =>
{
    const deleteUser=await theusers.deleteUser(req.session.userId);
    req.session.views=undefined;
    res.clearCookie('AuthCookie');
    res.render('pages/delete');
});

router.get('/profile',async(req,res) =>
{
    const findUser=await theusers.findUser(req.session.userId);
    res.render('pages/profile',{firstName: findUser[0].firstname,lastName: findUser[0].lastname,email: findUser[0].email, 
        age: findUser[0].age, streetAddress: findUser[0].street, city: findUser[0].city, state: findUser[0].state, zipcode: findUser[0].zipcode, 
        mobilePhone: findUser[0].mobilephone,userId: req.session.userId,password: req.session.password});
});

router.post('/profile',async(req,res)=>
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
