const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const Cryptr=require('cryptr');
const validation = require('../validation');

let exportedMethods=
{
    async addPayment(userId,cardName,cardNumber,cardType,cardBank,expDate,description)
    {
        userId=validation.checkUserName(userId);
        const usersCollection=await users();
        const findUser=await usersCollection.find({username: userId}).toArray();
        if(findUser.length==0)
        {
            throw "Error: Could not find user"
        }
        else
        {
            const cryptr=new Cryptr('myTotallySecretKey');
            const encrypt=cryptr.encrypt(cardNumber);
            const payment=
            {
                _id:ObjectId(),
                cardName: cardName,
                cardNumber: encrypt,
                cardType: cardType,
                cardBank: cardBank,
                expDate: expDate,
                description: description,
            }
            //payments.push(payment);
            const newpayments=findUser[0].payments;
            newpayments.push(payment);
            const newUserInfo=
            {
                username: findUser[0].username,
                password: findUser[0].password,
                firstname: findUser[0].firstname,
                lastname: findUser[0].lastname,
                email: findUser[0].email,
                age: findUser[0].age,
                street: findUser[0].street,
                city: findUser[0].city,
                state: findUser[0].state,
                zipcode: findUser[0].zipcode,
                mobilephone: findUser[0].mobilephone,
                payments: newpayments,
            }
            const userCollection=await users();
            const updateInfo=await userCollection.updateOne(
                {_id:findUser[0]._id},{$set:newUserInfo}
            );
            return newUserInfo;
        }
    }
}

module.exports=exportedMethods;

/*
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
*/
