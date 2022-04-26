
const express = require('express');
const router = express.Router();
const payments = require('../data/payments');
const validation = require('../validation');

/*
const debug = true;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};

function logit( str )
{
    //console.log('[' + new Date().toUTCString() + ']: ' + str );
}

router.get('/:id', async (req, res) => {
  
    const user = req.session.user;
    let errorMsg = "Add Payment page"
    let idnum = parseInt(req.params.id);

    logDebug("user is set to "+user+" "+idnum);
    if ( idnum == null)
        idnum = 0;

    if ( typeof idnum != "number" )
        idnum = 0;

    if (req.session.user) { // user is authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
    } else { // user is not authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        errorMsg = "Please login ";
        res.status(200).render('../views/pages/login', { error1: errorMsg });
        return;
    }


    let rtnArray = await payments.getAll(user);
    // fetch info from db collection for users payment array

    let len = 0;
    if ( Array.isArray( rtnArray) == true)
        len = rtnArray.length;
        
    if ( len == 0 ) {
        errorMsg = "update info for payment  "+idnum ;
        res.status(200).render('../views/pages/addPayment', { error1: errorMsg, idnum: 0 } );
        return;
    }

    let pay;
    if ( idnum >= 3 )
        idnum= 0; 
    if ( idnum < len )
        pay = rtnArray[idnum];  
    else {
         let pay1 = {
             cardName: "",
                cardNumber: "",
                cardType : "",
                cardBank : "",
                expDate : "",
                description: ""
            };
            pay = { error1: "new card " } 
    } 
         
    pay.error1 =  errorMsg;
    pay.idnum = idnum;
    logDebug(" return user info ");
    logDebug(pay);

    res.status(200).render('../views/pages/addPayment', pay );
    return;

});

router.post('/', async (req, res) => {

    const user = req.session.user;
    let errorMsg = "Add Payment page"

    let cardBank = req.body.cardBank;
    let cardNumber = req.body.cardNumber;
    let idnum = req.body.idnum;
    let rb = req.body;


    logDebug( " Got "+ idnum + " from bank "+cardBank  + " for card number  " + cardNumber );

    try {

        validation.checkBank(rb.cardBank);
        validation.checkExpDate(rb.expDate);
        validation.checkCardType(rb.cardType);
        validation.checkCardNumber(rb.cardNumber);

        let rtnArray = await payments.setPayment(user,rb);
    } catch ( e  )
    {
        logDebug(e); 
        rb.error1 = e;
        res.status(200).render('../views/pages/addPayment', rb );
        return;
    }

    rb.error1 = "Payment update OK";
    res.status(200).render('../views/pages/addPayment', rb );
    return;
/*
    let next = '/addPayment/'+idnum; 

    res.redirect(next); 
    */
//});



module.exports = router;
