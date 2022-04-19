const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
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

    logDebug("Create / update pet "+ up._id );

    const newPet = {
        _id: new ObjectId(),
       
        name: up.name,
        type: up.type,
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
    name: 1,
    type: 1,
    color: 1  ,
    breed: 1,
    age: 1  ,
    desciption: 1  ,
    img: 1 ,
    price: 1  ,
    status: 1  
    }

let pet = await petsCollection.find( query, { projection: proj  }).toArray();
pet.forEach((element) => {
  if (element.petId == petId) { 
    petMatch.petId = element.petId;
    petMatch.name  = element.name ;
    petMatch.type  = element.lastName ;
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

if (found == false) throw "Can not find pet";

logDebug(petMatch);

let rtn = {
  petId: petMatch.petId,
  name: petMatch.name  ,
  type:petMatch.type  ,
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


module.exports = {
  addPet,
  getPet,
  deletePet
};
  