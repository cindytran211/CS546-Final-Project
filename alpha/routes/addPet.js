const express = require('express');
const router = express.Router();

const debug = true;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};

function logit( str )
{
    //console.log('[' + new Date().toUTCString() + ']: ' + str );
}

router.get('/', (req, res) => {
    logDebug("user is set to "+req.session.user);
    let errorMsg = "Add Pet page"
    if (req.session.user) { // user is authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
       // res.redirect('/private'); 
    } else { // user is not authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        errorMsg = "Please login ";
        //res.status(200).render('../views/pages/login', { error1: errorMsg });
       // return;
    }
    res.status(200).render('../views/pages/addPet', { error1: errorMsg });

});

router.post('/', async (req, res) => {
    let petId = req.body.petId;
    let name = req.body.name;

    logDebug( " Got "+ petId + " " + name );


});



module.exports = router;
