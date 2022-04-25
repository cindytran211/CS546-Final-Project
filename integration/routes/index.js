const loginRoutes = require('./login');
const profileRoutes = require('./profile');
const addPetRoutes = require('./addPet');
const updatePetRoutes = require('./updatePet');
const searchPetRoutes = require('./searchPet');
const selectaPetRoutes = require('./selectaPet');
const selectOrderRoutes = require('./selectOrder');
const addPaymentRoutes = require('./addPayment');
const showOrdersRoutes = require('./showOrders');
const signUpRoutes=require('./signup');
const authRoutes=require('./authUser');
const deleteRoutes=require('./delete');
const logoutRoutes=require('./logout');

const debug = false;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};


const constructorMethod = (app) => {
    app.use('/login', loginRoutes);
    app.use('/signup',signUpRoutes);
    app.use('/auth',authRoutes);
    app.use('/delete',deleteRoutes);
    app.use('/logout',logoutRoutes);
    app.use('/profile', profileRoutes);
    app.use('/addPet', addPetRoutes);
    app.use('/updatePet', updatePetRoutes);
    app.use('/selectaPet', selectaPetRoutes);
    app.use('/selectOrder', selectOrderRoutes);
    app.use('/searchPet', searchPetRoutes);
    app.use('/addPayment', addPaymentRoutes);
    app.use('/showOrders', showOrdersRoutes);

    app.use('*', (req, res) => {
      res.redirect('/login');
      logDebug("Method "+req.method+" URL "+req.url);
      res.redirect('/');
      //res.sendStatus(404);
    });
	
  };
  
  module.exports = constructorMethod;