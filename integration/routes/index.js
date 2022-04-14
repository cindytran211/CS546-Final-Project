const petRoutes=require('./pets');

const constructorMethod=(app) => {
    //code to set up the site. All urls get passed to petRoutes. 
    //Extranoues urls would just get redirected to the homepage
    app.use('/',petRoutes);
    app.use('*', (req,res) => {
        res.status(404).json("Home");
    });
};

module.exports=constructorMethod;
