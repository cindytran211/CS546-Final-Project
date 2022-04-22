const loginRoutes=require('./login');
const signupRoutes=require('./signup');
const authRoutes=require('./auth');
const deleteRoutes=require('./delete');
const logoutRoutes=require('./logout');
const profileRoutes=require('./profile');
const constructorMethod=(app) => {
    //code to set up the site. All urls get passed to petRoutes. 
    //Extranoues urls would just get redirected to the homepage
   app.use('/login',loginRoutes);
   app.use('/signup',signupRoutes);
   app.use('/auth',authRoutes);
   app.use('/delete',deleteRoutes);
   app.use('/logout',logoutRoutes);
   app.use('/profile',profileRoutes);
   app.use('*', (req,res) => {
       res.redirect('/login');
   });
};

module.exports=constructorMethod;
