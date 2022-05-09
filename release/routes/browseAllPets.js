const express = require('express');
const router = express.Router();
const pets = require('../data/pets');

const debug = true;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};

function logit( str )
{
    //console.log('[' + new Date().toUTCString() + ']: ' + str );
}

router.get('/', async (req, res) => {
    let rb = req.body;

    logDebug("user is set to "+req.session.user);
    let errorMsg = "Browse All Pets page"
    if ( (req.session.user) ) { // user is authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
    } else { // user is not authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        errorMsg = "You have to login to see this page!";
        res.status(200).render('../views/pages/login', { error1: errorMsg, nologin: "true"   });
        return;
    }


    rtn = {};
    rtn.error1 = errorMsg;
    let searchArray = await pets.searchPets(rb);
    if (searchArray.length == 0 ) {
        rtn.error1 = "That pet is not in our system, feel free to ask the admin to add it!";
        rtn.petSearchArray = [];
    } else
        rtn.petSearchArray = searchArray;

    logDebug(" pet select is true  "+ rtn);

    if ( (req.session.user) && (req.session.user == "admin") ) { // user is authenticated
        rtn.admin = "true";
        res.status(200).render('../views/pages/updatePetList', rtn);
    } else {
        res.status(200).render('../views/pages/selectPetList', rtn);
    }
    return;


});


module.exports = router;
