const loginRoutes = require('./login');
const profileRoutes = require('./profile');
const addPetRoutes = require('./addPet');
const updatePetRoutes = require('./updatePet');
const searchPetRoutes = require('./searchPet');
const addPaymentRoutes = require('./addPayment');


const constructorMethod = (app) => {
    app.use('/', loginRoutes);
    app.use('/profile',profileRoutes);
    app.use('/addPet',addPetRoutes);
    app.use('/updatePet',updatePetRoutes);
    app.use('/searchPet',searchPetRoutes);
    app.use('/addPayment',addPaymentRoutes);
	
    app.use('*', (req, res) => {
      res.redirect('/');
      //res.sendStatus(404);
    });
	
  };
  
  module.exports = constructorMethod;