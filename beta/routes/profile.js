
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

    rtn.error1 =  errorMsg;
    logDebug(" return user info ");
    logDebug(rtn);

    res.status(200).render('../views/pages/profile', rtn );
   // res.status(200).render('../views/pages/profile', { userId: user, error1: errorMsg });

});


router.post('/', async (req, res) => {
    const user = req.session.user;
    let up = req.body;
    let errorMsg = "Profile page"

    logDebug( " Got update "+ user + " "+ up.firstname + " " + up.lastname );


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
    
    let rtn = {};
  
    try {
        rtn = await users.setUser(set);
        // fetch info from db collection for users
        rtn = await users.getUser(user);
        rtn.error1 =  errorMsg;

    } catch (e) {
        rtn = await users.getUser(user);
        rtn.error1 = e;
    }

    res.status(200).render('../views/pages/profile', rtn );
    return;
    //res.redirect('/profile'); 
});



module.exports = router;