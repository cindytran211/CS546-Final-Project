
const express = require('express');
//const { getUser } = require('../data/users');
const users = require('../data/users');
const router = express.Router();

const debug = true;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};

function logit( str )
{
    console.log('[' + new Date().toUTCString() + ']: ' + str );
}


router.get('/',  async (req, res) => {
    logDebug("user is set to "+req.session.user);
    const user = req.session.user;
    let errorMsg = "Profile page"
    if (req.session.user) { // user is authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
       // res.redirect('/private'); 
    } else { // user is not authenticated
        logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        errorMsg = "Please login ";
        //res.status(200).render('../views/pages/login', { error1: errorMsg });
       // return;
    }
    
    let rtn = await users.getUser(user);
    // fetch info from db collection for users

    rtn.errorMsg =  errorMsg;
    logDebug(" return user info ");
    logDebug(rtn);

    res.status(200).render('../views/pages/profile', rtn );
   // res.status(200).render('../views/pages/profile', { userId: user, error1: errorMsg });

});


router.post('/', async (req, res) => {
    const user = req.session.user;

    let firstname = req.body.firstName;
    let lastname = req.body.lastName;


    logDebug( " Got update "+ user + " "+ firstname + " " + lastname );

    let set1 = {
        userId : user,
        firstName : firstname,
        lastName : lastname 
    }

    let up = req.body;

    let set =  { 
      userId : user,
      firstName: up.firstName,
      lastName : up.lastName,
      email : up.email,
      mobilePhone : up.mobilePhone,
      streetAddress : up.streetAddress,
      city: up.city,
      state: up.state,
      zipcode: up.zipcode,
      age: up.age
    }
    
    let rtn = await users.setUser(set);
    // fetch info from db collection for users


});



module.exports = router;