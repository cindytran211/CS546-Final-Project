const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const petsCol = mongoCollections.pets;


const debug = false;
const logDebug = function logDebug(str) {
  if (debug) console.error(str);
};


function logit(str) {
    console.log("[" + new Date().toUTCString() + "]: " + str);
  }

async function addPet(petId) {
}

async function deletePet(petId) {
}


module.exports = {
  addPet,
  deletePet
};
  