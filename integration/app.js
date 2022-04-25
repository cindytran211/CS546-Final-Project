const express = require("express");
const exphbars = require("express-handlebars");
const app = express();
const staticDir = express.static(__dirname + "/public");
const session = require("express-session");
const configRoutes = require("./routes");

/*
const debug = false;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};
*/

/*
function logit( str ) {
    console.log('[' + new Date().toUTCString() + ']: ' + str );
}
*/

//app.use;
app.use("/public", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars',exphbars({defaultLayout:'main'}));
app.set("view engine", "handlebars");

/*
var hbs = require('handlebars');
hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});
*/

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

/*
let totalRequests = 0;
app.use(async ( req, res, next)=> {
  totalRequests++;
  logDebug("req#="+totalRequests);

  if ( !req.session )
    logit(req.method + ' ' + req.originalUrl )
  else if (req.session.user) { // user is authenticated
    logit(req.method + ' ' + req.originalUrl + ' (Authenticated User)')
  } else { // user is not authenticated
    logit(req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
  }

  next();
});



app.use("/private", (req, res, next) => {
  logDebug("app use /private" );
  // console.log(req.session.id);
  logDebug(" method is "+req.method);
  // if no session user got to /
  if ( req.method == "GET") {
    if (!req.session.user) {
      // user not logged in  
      logit( req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
      errorMsg = "Login failed try again";
      res.status(403).render('../views/pages/login', { error1 : errorMsg });
      //return res.redirect("/");   // no user
    } else {
      // user logged in fall through
      next();
    }
  } else
    next();
});

app.use("/login", (req, res, next) => {
  logDebug("app use /login" );
  // with authentication go to private
  if (req.session.user) {
    return res.redirect("/private");
  } else {
    logDebug("app use /login next" );
    //here I',m just manually setting the req.method to post since it's usually coming from a form
    // req.method = 'POST';
    next();
  }
});
*/

app.use('/auth', async(req,res,next) => 
{
    if(req.session.views!=1)
    {
        return res.status(403).render('pages/error',{title:"Not logged in"});
    }
    next();
});

app.use('/profile', async(req,res,next) => 
{
    if(req.session.views!=1)
    {
        return res.status(403).render('pages/error',{title:"Not logged in"});
    }
    next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
