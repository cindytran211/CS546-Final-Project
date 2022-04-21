const express= require('express');
const app=express();
const path=require('path');
const session=require('express-session');
const static=express.static(__dirname+'/public');
app.use(session({
    name:'AuthCookie',
    secret:"I'm a secret string!",
    resave: false,
    saveUninitialized: true
}));

const configRoutes=require('./routes');
const exphbs=require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',exphbs.engine({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

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

app.listen(3000,() => 
{
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
})
