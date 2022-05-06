
const loginRoutes = require('./login');
const altloginRoutes = require('./altlogin');
const profileRoutes = require('./profile');
const addPetRoutes = require('./addPet');
const updatePetRoutes = require('./updatePet');
const searchPetRoutes = require('./searchPet');
const selectaPetRoutes = require('./selectaPet');
const selectOrderRoutes = require('./selectOrder');
const addPaymentRoutes = require('./addPayment');
const showOrdersRoutes = require('./showOrders');
const favPetListRoutes = require('./favPetList');
const browseAllPetsRoutes = require('./browseAllPets');


const debug = false;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};


const constructorMethod = (app) => {
    if ( global.alt == false ) 
      app.use('/', loginRoutes);
    else
      app.use('/', altloginRoutes);
  
    app.use('/profile', profileRoutes);
    app.use('/addPet', addPetRoutes);
    app.use('/updatePet', updatePetRoutes);
    app.use('/selectaPet', selectaPetRoutes);
    app.use('/selectOrder', selectOrderRoutes);
    app.use('/searchPet', searchPetRoutes);
    app.use('/addPayment', addPaymentRoutes);
    app.use('/showOrders', showOrdersRoutes);
    app.use('/favorites', favPetListRoutes);
    app.use('/browseAllPets', browseAllPetsRoutes);

    app.use('*', (req, res) => {
      logDebug("Method "+req.method+" URL "+req.url);
      res.redirect('/');
      //res.sendStatus(404);
    });
	
  };
  
  module.exports = constructorMethod;