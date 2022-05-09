const express = require('express');
const router = express.Router();
const pets = require('../data/pets');
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
    let petId;
    let rb = req.body;

    logDebug("user is set to "+req.session.user);
    let errorMsg = "Search Pet page"
    if ( (req.session.user) ) { // user is authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
    } else { // user is not authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        errorMsg = "You have to login to access this page!";
        res.status(200).render('../views/pages/login', { error1: errorMsg });
        return;
    }

    let userId = req.session.user;

    let rtn = {}

    logDebug("user is set to "+req.session.user);

    rtn.error1 = "Favorite pet list";
    let searchArray = await users.getFavoritesUser(userId);
    rtn.petSearchArray = [];

    if (searchArray.length == 0 ) {
        rtn.error1 = "You have no favorites, feel free to add some!";   
    } else {
        //rtn.petSearchArray = searchArray;
        for ( let i = 0 ; i < searchArray.length; i++ ) {
                let pet = await pets.getPet(searchArray[i]);
                rtn.petSearchArray.push(pet);

        } 
    }

    if ( (req.session.user) && (req.session.user == "admin") ) { // user is authenticated
        rtn.admin = "true";
        res.status(200).render('../views/pages/updatePetList', rtn);
    } else {
        res.status(200).render('../views/pages/selectPetList', rtn);
    }
    return;


});


module.exports = router;
