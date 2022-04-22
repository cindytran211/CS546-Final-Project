const userRoutes=require('./userRoutes');
const paymentRoutes=require('./addPayment');
const constructorMethod=(app) => {
    //code to set up the site. All urls get passed to petRoutes. 
    //Extranoues urls would just get redirected to the homepage
   app.use('/',userRoutes);
   app.use('*', (req,res) => {
       res.redirect('/');
   });
   app.use('/addPayment',paymentRoutes);
};

module.exports=constructorMethod;
