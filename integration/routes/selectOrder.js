const express = require('express');
const router = express.Router();
const users = require('../data/users');
const orders = require('../data/orders');
const pets = require('../data/pets');


const debug = true;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};

function logit( str )
{
    //console.log('[' + new Date().toUTCString() + ']: ' + str );
}


router.get('/:id', async (req, res) => {
        let transId = req.params.id;
        let userId = req.session.user;


    logDebug("user is set to "+req.session.user);
    let errorMsg = "Show Order page"
    if ( (req.session.user) ) { // user is authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
    } else { // user is not authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        errorMsg = "Please login as user admin ";
        res.status(200).render('../views/pages/login', { error1: errorMsg });
        return;
    }

    let rtn1 = await orders.getOrder(transId);
    let petId = rtn1.petId;
    let status =  rtn1.status;

    let pet = await pets.getPet(petId);

    let rtn = {};
    rtn.transId = transId;
    rtn.userId = rtn1.userId;
    rtn.petId = petId;
    rtn.error1 = errorMsg;
    rtn.petName = pet.petName;
    rtn.petPrice = pet.price;

    rtn.status = status;

    res.status(200).render('../views/pages/showOrders', rtn);


});



module.exports = router;
