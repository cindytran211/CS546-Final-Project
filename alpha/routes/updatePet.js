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

router.get('/:id', async (req, res) => {
    //let petId = req.session.petId;
    let idnum = req.params.id;

    let petId = idnum;
    logDebug("user is set to "+req.session.user);
    let errorMsg = "Update Pet page"
    if ( (req.session.user) && (req.session.user == "admin") ) { // user is authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
    } else { // user is not authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        errorMsg = "Please login as user admin ";
        res.status(200).render('../views/pages/login', { error1: errorMsg });
        return;
    }

    let rtn = await pets.getPet(petId);
    rtn.error1 = errorMsg;
    res.status(200).render('../views/pages/updatePet', rtn);

});

router.post('/', async (req, res) => {
    let petId = req.body.petId;
    let name = req.body.name;
    let rb = req.body;

    logDebug( " Got "+ petId + " " + name );

    logDebug("user is set to "+req.session.user);
    let errorMsg = "Update Pet page"
    if ( (req.session.user) && (req.session.user == "admin") ) { // user is authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
    } else { // user is not authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        errorMsg = "Please login as user admin ";
        res.status(200).render('../views/pages/login', { error1: errorMsg });
        return;
    }


    let rtn = await pets.updatePet(petId,rb);

    rtn.error1 = "Updated pet created";
    
    logDebug(" pet created is true " + petId + " "+ rtn);
    res.status(200).render('../views/pages/updatePet', rtn);
    return;
    




});



module.exports = router;
