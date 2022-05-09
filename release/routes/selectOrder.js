const express = require('express');
const router = express.Router();
const users = require('../data/users');
const orders = require('../data/orders');
const pets = require('../data/pets');
const validation = require('../validation');

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
        errorMsg = "You have to login to see this page!";
        res.status(200).render('../views/pages/login', { error1: errorMsg, nologin: "true"  });
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

    if ( userId == "admin") {
        rtn.admin = "true";
        res.status(200).render('../views/pages/updateOrders', rtn);
    } else {
        res.status(200).render('../views/pages/showOrders', rtn);
    }


});

router.post('/', async (req, res) => {

    logDebug ( " select order post");
    let rb = req.body;

    logDebug("user is set to "+req.session.user);
    let errorMsg = "Update Order page"
    if ( (req.session.user) && (req.session.user == "admin") ) { // user is authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
    } else { // user is not authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        errorMsg = "You have to login to see this page!";
        res.status(200).render('../views/pages/login', { error1: errorMsg , nologin: "true"  });
        return;
    }


    let transId = rb.transId;

    //let rtn1 = await orders.getOrder(transId);

    let rtn1 = await orders.getOrder(transId);
    let petId = rtn1.petId;
    //let status =  rtn1.status;
    let pet = await pets.getPet(petId);
    let rtn = {};
    rtn.transId = transId;
    rtn.userId = rtn1.userId;
    rtn.petId = petId; 
    rtn.petName = pet.petName;
    rtn.petPrice = pet.price;

    try {
        rtn1.status = validation.checkOrderStatus(rb.status);
    } catch (e)
    {
        rtn.error1 = "Bad Order Status";
        rtn.admin = "true";
        res.status(200).render('../views/pages/updateOrders', rtn);
        return;
    } 

    let rtn2 = await orders.updateOrder(rtn1);
    rtn2.error1 = "Update Order Done";

    rtn2.petName = pet.petName;
    rtn2.petPrice = pet.price;
    rtn2.admin = "true";
    res.status(200).render('../views/pages/updateOrders', rtn2);


});



module.exports = router;
