const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const validation = require('../validation');
const petsCol = mongoCollections.pets;


const debug = true;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};


function logit(str) {
    console.log("[" + new Date().toUTCString() + "]: " + str);
  }

async function addPet(petId,up) {

    let id = up._id;

    logDebug("Create pet "+ up._id );

    const newPet = {
        _id: new ObjectId(),
       
        petName: up.petName,
        petType: up.petType,
        color : up.color,
        breed : up.breed,
        age : up.age,
        description: up.description,
        img: up.img,
        price: up.price,
        status: up.status
      //  comments: up.comments,
      //  likes: up.likes
    };
    newPet.petId = newPet._id.toString();
    petId = newPet.petId;
    const petCollection = await petsCol();

    validation.checkPetName(up.petName);
    validation.checkPetColor(up.color);
    validation.checkPetType(up.petType);
    validation.checkPetAge(up.age);
    validation.checkPetBreed(up.breed);
    validation.checkPetPrice(up.price);
    validation.checkPetStatus(up.status);


    let insertInfo;
    try {
        insertInfo = await petCollection.insertOne(newPet);
    } catch (e) {
      logDebug (e);
    };

    if (insertInfo.insertedCount === 0) {
      throw "Failed to create " + newPet;
    } 
  
    logDebug(" pet created is true " + petId + " " +insertInfo.insertedCount );

    return( newPet);

}

async function updatePet(petId,up) {

  let id = petId;

  logDebug("Update pet "+ id);

  const newPet = {
      _id: new ObjectId(petId),
      petId: up.petId,
      petName: up.petName,
      petType: up.petType,
      color : up.color,
      breed : up.breed,
      age : up.age,
      description: up.description,
      img: up.img,
      price: up.price,
      status: up.status
    //  comments: up.comments,
    //  likes: up.likes
  };
  //newPet.petId = newPet._id.toString();
  //petId = newPet.petId;
  const petCollection = await petsCol();

  validation.checkPetName(up.petName);
  validation.checkPetColor(up.color);
  validation.checkPetType(up.petType);
  validation.checkPetAge(up.age);
  validation.checkPetBreed(up.breed);
  validation.checkPetPrice(up.price);
  validation.checkPetStatus(up.status);

  let updateInfo;
  try {
    updateInfo = await petCollection.updateOne( { petId: up.petId },{ $set:  newPet } );
    logDebug(updateInfo);
    } catch (e) {
    // if (updateInfo.insertedCount === 0) {
        logDebug("updateone failed");
        logDebug(updateInfo);
        throw "Failed to update "+ userId;
    }

  logDebug(" pet created is true " + petId  );

  return( newPet);

}

async function notAvailPet(petId) {

  let rtn = await getPet (petId);

  rtn.status = "sold";

  let rtn2 = await updatePet(petId,rtn);

}

async function getPet(petId) {

  logDebug("Get Pet "+ petId);

  if ( ( petId == null) || (petId == ""))
    return { error1 : "PetId not defined"}
  
let petMatch = {};
let found = false;

logDebug("checkPet");


const petsCollection = await petsCol();
let query = { petId: petId };
logDebug( query );
let proj = { 
    _id: 1, 
    petId: 1, 
    petName: 1,
    petType: 1,
    color: 1  ,
    breed: 1,
    age: 1  ,
    description: 1  ,
    img: 1 ,
    price: 1  ,
    status: 1  
    }

let pet = await petsCollection.find( query, { projection: proj  }).toArray();
pet.forEach((element) => {
  if (element.petId == petId) { 
    petMatch.petId = element.petId;
    petMatch.petName  = element.petName ;
    petMatch.petType  = element.petType ;
    petMatch.color  = element.color ;
    petMatch.breed  = element.breed ;
    petMatch.age  = element.age ;
    petMatch.description  = element.description ;
    petMatch.img  = element.img ;
    petMatch.price  = element.price ;
    petMatch.status  = element.status ;
    
    found = true;
    logDebug(element);
  }
});

if (found == false) {
//  throw "Can not find pet";
  return {};
}

logDebug(petMatch);

let rtn = {
  petId: petMatch.petId,
  petName: petMatch.petName  ,
  petType:petMatch.petType  ,
  color:petMatch.color  ,
  breed:petMatch.breed  ,
  age:petMatch.age  ,
  description:petMatch.description  ,
  img:petMatch.img  ,
  price:petMatch.price  ,
  status:petMatch.status
  }

return rtn ;
}


async function deletePet(petId) {

logDebug("delete Pet");

}

async function searchPets(up) {

  logDebug("Search Pet ");

  let petMatch = {};
  let found = false;

  let queryPet = {};

  if ( up.petType && up.petType!="" )
    queryPet.petType = up.petType;
  if ( up.color && up.color!="" )
    queryPet.color = up.color;
  if ( up.status && up.status!="" )
    queryPet.status = up.status;

  let maxAge = 99;
  let maxPrice = 999999999;
  if ( up.age && up.age!="" )
    maxAge = parseInt(up.age);
  if ( up.price && up.price!="" )
    maxPrice = parseInt(up.price);

  

/*
   queryPet = {
     
      petType: up.petType,
      color : up.color,
      status: up.status
  };
*/

logDebug( queryPet );
let proj = { 
    _id: 1, 
    petId: 1, 
    petName: 1,
    petType: 1,
    color: 1  ,
    breed: 1,
    age: 1  ,
    desciption: 1  ,
    img: 1 ,
    price: 1  ,
    status: 1  
    }
    const petsCollection = await petsCol();
    let pet = await petsCollection.find( queryPet, { projection: proj  }).toArray();
    let rtnArray = [];

    logDebug( " Check max age "+maxAge+" max price "+maxPrice);
    pet.forEach((element) => {  
      logDebug( " Check age "+element.age+" price "+element.price);
      let ePrice = Number.parseInt(element.price);
      let eAge =  Number.parseInt(element.age);
      if ( isNaN(ePrice) ) ePrice = 0;
      if ( isNaN(eAge) ) eAge = 0;
      if ( ( ePrice <= maxPrice) && ( eAge <= maxAge ) ) { 
        element._id = element._id.toString();
        rtnArray.push(element);
        found = true;
        logDebug(element.petId);
      }
    });

// if (found == false) throw "Can not find pet";
logDebug( " query Done" );
return rtnArray ;
}





module.exports = {
  addPet,
  getPet,
  deletePet,
  searchPets,
  updatePet,
  notAvailPet
};
  