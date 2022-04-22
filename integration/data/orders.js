const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const ordersCol = mongoCollections.orders;


const debug = true;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};


function logit(str) {
    console.log("[" + new Date().toUTCString() + "]: " + str);
  }

async function orderPet(userId,petId,pay,up) {


    logDebug("Order pet "+ petId +" user  "+userId);

    const newOrder = {
        _id: new ObjectId(),
        // transId: transId,
        userId: userId,
        petId: petId,
        payment : pay,
        status: "billed"
    };
    newOrder.transId = newOrder._id.toString();
    transId = newOrder.transId;
    newOrder.date = new Date().toLocaleDateString();

    const orderCollection = await ordersCol();

    let insertInfo;
    try {
        insertInfo = await orderCollection.insertOne(newOrder);
    } catch (e) {
      logDebug (e);
    };

    if (insertInfo.insertedCount === 0) {
      throw "Failed to create " + newOrder;
    } 
  
    logDebug("Order created is true " + transId  );

    return( newOrder);

}

async function updateOrder(up) {

  let id = up.transId;
  let transId = up.tansId;

  logDebug("Update Order "+ id);

  const newOrder = {
      _id: new ObjectId(transId),
      transId: transId,
      petId: up.petId,
      userId: userId,
      payment: up.payment,
      date : up.date,
      breed : up.breed,
      status: up.status
  };

  const orderCollection = await ordersCol();

  let updateInfo;
  try {
    updateInfo = await orderCollection.updateOne( { transId: up.transId },{ $set:  newOrder } );
    logDebug(updateInfo);
    } catch (e) {
        logDebug("updateone failed");
        logDebug(updateInfo);
        throw "Failed to update "+ transId;
    }

  logDebug(" Order created is true " + transId  );

  return( newOrder);

}



async function getOrder(transId) {

  logDebug("Get order "+ transId);

  if ( ( transId == null) || (transId == ""))
    return { error1 : "TransId not defined"}
  
let orderMatch = {};
let found = false;

logDebug("check Order");


const ordersCollection = await ordersCol();
let query = { transId: transId };
logDebug( query );
let proj = { 
    _id: 1, 
    transId: 1,
    petId: 1, 
    userId: 1,
    payment: 1,
    date: 1  ,
    status: 1  
    }

let order = await ordersCollection.find( query, { projection: proj  }).toArray();
order.forEach((element) => {
  if (element.transId == transId) { 
    orderMatch.transId = element.transId;
    orderMatch.petId = element.petId;
    orderMatch.userId  = element.userId ;
    orderMatch.payment  = element.payment ;
    orderMatch.date  = element.date ;
    orderMatch.status  = element.status ;
    
    found = true;
    logDebug(element);
  }
});

if (found == false) {
//  throw "Can not find pet";
  return {};
}

logDebug(orderMatch);

let rtn = {
  petId: orderMatch.petId,
  petName: orderMatch.petName  ,
  petType:orderMatch.petType  ,
  color:orderMatch.color  ,
  breed:orderMatch.breed  ,
  age:orderMatch.age  ,
  description:orderMatch.description  ,
  img:orderMatch.img  ,
  price:orderMatch.price  ,
  status:orderMatch.status
  }

return rtn ;
}


async function deleteOrder(transId) {

logDebug("delete Pet");

}


module.exports = {
  orderPet,
  getOrder,
  updateOrder
};
  