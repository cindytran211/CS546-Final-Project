const express=require('express');
const router=express.Router();

//Would direct user to homepage
router.get("",(req,res)=>{
    res.status(404).json("Home");
});

//Would direct user to the pets page
router.get("/pets",(req,res)=>{
    res.status(404).json("Pets");
})

//Would direct user to the users page
router.get("/users",(req,res)=>{
    res.status(404).json("Users");
})

//Would direct user to the adoption page
router.get("/adopt",(req,res)=>{
    res.status(404).json("Adopt");
})

module.exports=router;