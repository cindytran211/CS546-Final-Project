const express = require('express');
const router = express.Router();
const orders = require('../data/orders');
const users = require('../data/users');

const debug = true;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};

function logit( str )
{
    //console.log('[' + new Date().toUTCString() + ']: ' + str );
}

router.get('/', async (req, res) => {

    let userId = req.session.user;
    let rb = req.body;
   

    logDebug("user is set to "+req.session.user);
    let errorMsg = "Order Pet page"
    if ( (req.session.user) && (req.session.user != "admin") ) { // user is authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
    } else { // user is not authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        errorMsg = "Please login as user  ";
        res.status(200).render('../views/pages/login', { error1: errorMsg });
        return;
    }

    let rtn3 = await users.orderUser(userId,0);

    let rtn4 = {};
    rtn4.orderArray = rtn3; 
    rtn4.error1 = "Order List";

    res.status(200).render('../views/pages/selectOrderList', rtn4);
    return;
    




});



module.exports = router;
