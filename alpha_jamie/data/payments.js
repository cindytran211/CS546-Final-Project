const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const usersCol = mongoCollections.users;

const bcrypt = require("bcryptjs");

const salt = 16;

const debug = true;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};

function logit(str) {
  console.log("[" + new Date().toUTCString() + "]: " + str);
}


async function getAll(userId) {

    if (userId == undefined || userId == null) {
        throw  ("userId is not defined");
    } else if (typeof userId != "string") {
        throw   ("Invalid type : userId "+typeof userId);
    } if ( userId.trim().length == 0)
        throw  ('userId cannot be an empty string or just spaces');

    userId = userId.trim();

    //const userCollection = await usersCol();
    //const user = await userCollection.findOne({_id: idObj});

    const usersCollection = await usersCol();
    const user = await usersCollection.findOne({userId: userId},  { projection: { _id: 0,  "paymentArray" : 1 } }   );

    if (user == null) {
        throw ("No users with id: "+userId);
    }

    // stringify the ids
    // user._id = user._id.toString();
    let len = 0;
    if ( Array.isArray( user.paymentArray ) == false ) 
        len=0;
    else 
        len = user.paymentArray.length;

    logDebug( " return payment array "+len);
    if ( len > 0 ) { 
        user.paymentArray.forEach ( element => {
            element._id = element._id.toString();
        });
        return user.paymentArray
    } else {
        return {};
    }

}




async function setPayment(userId, up ) {


    let id = up._id;

    logDebug("Create / update "+ up._id );

    const newPayment = {
        _id: new ObjectId(),
        cardName: up.cardName,
        cardNumber: up.cardNumber,
        cardType : up.cardType,
        cardBank : up.cardBank,
        expDate : up.expDate,
        description: up.description
    };

    const updatePayment = {
        cardName: up.cardName,
        cardNumber: up.cardNumber,
        cardType : up.cardType,
        cardBank : up.cardBank,
        expDate : up.expDate,
        description: up.description
    };


    const usersCollection = await usersCol();
    let user;
    if ( ( id != null) && (id != "") ) {
        try {
            idObj = ObjectId(id);
        } catch (e) {
            throw "Invalid parameter: id "+e;
        }   
    
        //const user = await usersCollection.findOne({ "paymentArray.cardNumber" : cardNumber},  { projection: { _id: 0,  "paymentArray" : 1 } }   );
        user = await usersCollection.findOne({ "paymentArray._id": idObj },  { projection: { _id: 0,  "paymentArray" : 1 } }   );
        if ( user != null) {  
            logDebug( "Updating existing payment ");
            updatePayment._id = idObj;
            user = await usersCollection.updateOne({ "paymentArray._id": idObj },  { $set: { "paymentArray.$" : updatePayment } }  );
            if ( user.modifiedCount != 1  )
             throw  ("Could not update users / payments successfully");
        } else {
            logDebug( "New  payment 1");
            const result = await usersCollection.updateOne( {userId: userId}, {$push: { paymentArray : newPayment } } );
            if ( result.modifiedCount != 1  )
                throw  ("Could not update users / payments successfully");
        }
    } else {
        logDebug( "New  payment 1");
        const result = await usersCollection.updateOne( {userId: userId}, {$push: { paymentArray: newPayment } } );
        if ( result.modifiedCount != 1  )
            throw  ("Could not update users / payments successfully");
    }

    //const rtn = await usersData.get(userId);
	return;
}
	


module.exports = {
//  getPayments,
  setPayment,
  getAll
};
