const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const validation = require('../validation');
const usersCol = mongoCollections.users;

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const algorithm = "aes-256-cbc"; 
const salt = 16;

//const initVector0 = crypto.randomBytes(16);
//const Securitykey0 = crypto.randomBytes(32);

let initVector1 = [136, 49, 184, 134, 153, 205, 192, 232, 241, 240, 152, 251, 224, 88, 63, 19];
let Securitykey1 =  [139, 18, 7, 139, 33, 55, 108, 217, 222, 222, 116, 34, 115, 58, 29, 64, 66, 212, 101, 8, 254, 76, 75, 160, 18, 186, 136, 130, 27, 108, 164, 80];


let initVector = new Uint8Array( initVector1 ).buffer;
let Securitykey = new Uint8Array( Securitykey1 ).buffer;

/*
console.log("The random data is: "+ initVector0.toString('hex'));
console.log("The random data is: "+ Securitykey0.toString('hex'));
console.log("The random data is: "+ initVector.toString('hex'));
console.log("The random data is: "+ Securitykey.toString('hex'));
*/



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

        for ( let i = 0; i < user.paymentArray.length ; i++ ) {
            user.paymentArray[i]._id = user.paymentArray[i]._id.toString();
            logDebug(user.paymentArray[i].cardNumber);
            try {
              const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
              let decryptedData = decipher.update(user.paymentArray[i].cardNumber, "hex", "utf-8");
              decryptedData += decipher.final("utf8");
              user.paymentArray[i].cardNumber = decryptedData;
            } catch (e)
            {
                user.paymentArray[i].cardNumber = "1111-1111-1111-1111";
            }
            logDebug("Dencrypt "+ user.paymentArray[i].cardNumber);
        }
        
        return user.paymentArray
    } else {
        return {};
    }

}


async function getPayment(userId,index) {

    if (userId == undefined || userId == null) {
        throw  ("userId is not defined");
    } else if (typeof userId != "string") {
        throw   ("Invalid type : userId "+typeof userId);
    } if ( userId.trim().length == 0)
        throw  ('userId cannot be an empty string or just spaces');

    userId = userId.trim();

    let rtnArray = await getAll(userId);

    if ( rtnArray.length > index ) {
        rtn = rtnArray[index];
        return rtn;
    } else {
        return {};
    }

}

async function setPayment(userId, up ) {


    let id = up._id;

    logDebug("Create / update "+ up._id );
    let cardNumString = "";
    let ty = typeof  up.cardNumber;

    if ( ty == "string" )
        cardNumString = up.cardNumber;
    else
        cardNumString = up.cardNumber.toString();
    
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(cardNumString, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    logDebug("Encrypt "+encryptedData);

    const newPayment = {
        _id: new ObjectId(),
        cardName: up.cardName,
        cardNumber: encryptedData,
        cardType : up.cardType,
        cardBank : up.cardBank,
        expDate : up.expDate,
        description: up.description
    };

    const updatePayment = {
        cardName: up.cardName,
        cardNumber: encryptedData,
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

	return;
}
	


module.exports = {
  getPayment,
  setPayment,
  getAll
};
