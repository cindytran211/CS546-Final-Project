const express = require('express');
const router = express.Router();
const pets = require('../data/pets');
const payments = require('../data/payments');
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

router.get('/:id', async (req, res) => {
    //let petId = req.session.petId;
    let idnum = req.params.id;
    let userId = req.session.user;
    let petId = idnum;

    logDebug("user is set to "+ userId + " idnum " + idnum);
    let errorMsg = "Select a Pet page"
    if ( (req.session.user) && (req.session.user != "admin") ) { // user is authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
    } else { // user is not authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        errorMsg = "Please login as user  ";
        res.status(200).render('../views/pages/login', { error1: errorMsg });
        return;
    }

    logDebug (" select a pet getting petid "+ petId);

    let rtn = await pets.getPet(petId);

    if ( rtn.status == "available" )
        rtn.available = "available";

    let isFav = await users.isFavoritesUser(userId,rtn.petId);

    logDebug ( "is fav "+ isFav);
    if ( isFav == true) {
        rtn.isFav = "Favorite";
        //errorMsg = "Favorite";
    }
   
    logDebug (" select a pet getting payments for "+ userId);

    let rtnPay = await payments.getAll(userId);

    let i = 0;
    let len = rtnPay.length;
    if ( len <= 0 ) {
        errorMsg = "Please add a payment card ";
    } else {
        rtn.pay = [];
        for (; i < len ; i++ ) {
            rtn.pay[i] = rtnPay[i].cardBank;  
        }
    } 

    rtn.error1 = errorMsg;
    res.status(200).render('../views/pages/selectaPet', rtn);

});

router.post('/', async (req, res) => {
    let petId = req.body.petId;
    let petName = req.body.petName;
    let userId = req.session.user;
    let rb = req.body;
    let cardIndex = rb.card;
    let toggleFavorite = rb.toggleFavorite;
    let submitComment = rb.submitComment;
    let incLikes = rb.incLikes;

    logDebug( "From "+userId+" Buy  "+ petId + " " + petName +" "+ toggleFavorite );

    logDebug( "From "+userId+" Buy  "+ petId + " " + petName );

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

    if ( toggleFavorite == "toggle") {

        logDebug(" Toggle fav Post ")

        await users.toggleFavoritesUser(userId,petId);

        res.redirect("/selectaPet/"+petId); 
        //res.status(200).render('../views/pages/selectaPet', rtn);
        return;
    }

    if ( submitComment == "comment") {

        logDebug ( " Submit comment " + rb.commentInput);

        if ( rb.commentInput != "" ) {
            let comment = userId+": "+rb.commentInput;
            await pets.addCommentPet(petId,comment);
        }
        res.redirect("/selectaPet/"+petId); 
        return;
    }

    if ( incLikes == "likes") {

        logDebug ( " INc Likes ");

        await pets.incLikesPet(petId);
        
        res.redirect("/selectaPet/"+petId); 
        return;
    }

    let rtn0 = await users.getUser(userId);
    if ( ( rtn0.email == null ) || (rtn0.email.trim == "")) {
        let errorMsg = "Update your profile";
        res.status(200).render('../views/pages/authUser', { error1: errorMsg });
        return;
    }

    let payment = await payments.getPayment(userId,cardIndex);

    let rtn = await orders.orderPet(userId,petId,payment,rb);

    let rtn2 = await pets.notAvailPet(petId);

    let rtn3 = await users.orderUser(userId,rtn.transId);

    let rtn4 = {};
    rtn4.orderArray = rtn3; 
    rtn4.error1 = "Order done";
    
    logDebug(" Order done " + petId + " transId "+ rtn.transId );
    res.status(200).render('../views/pages/selectOrderList', rtn4);
    return;
    




});



module.exports = router;
