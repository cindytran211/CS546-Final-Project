const allRoutes=require('./allRoutes');

const constructorMethod=(app) => {
    //code to set up the site. All urls get passed to petRoutes. 
    //Extranoues urls would just get redirected to the homepage
   app.use('/',allRoutes);
   app.use('*', (req,res) => {
       res.redirect('/');
   });
};

module.exports=constructorMethod;
