const dbConnection = require('./config/mongoConnection');

const data = require('./data/');

const orders = data.orders;
const users = data.users;
const pets = data.pets;
const payments = data.payments;


//const orders = require('../data/orders');
//const users = require('../data/users');
//const pets = require('../data/pets');
//const payments = require('../data/payments');

//const validation = require('../validation');


const debug = true;
const logDebug = function logDebug(str) {
    if (debug) console.error(str);
}



async function main() {
    const db = await dbConnection.connectToDb();
    await db.dropDatabase();

    try { 
		// create admin user
		let userId = "admin";
		let passWord = "admin10";
		let rtn = await users.createUser (userId, passWord );
	
		// create normal user
		userId = "jamie10";
		passWord = "jamie10";
		rtn = await users.createUser (userId, passWord );
		
		let jset =  { 
			userId : userId,
			firstName: "Jamie",
			lastName : "Shamilian",
			email : "jsham@gmail.com",
			mobilePhone : "201-123-4567",
			streetAddress : "10 Main Street",
			city: "Hoboken",
			state: "NJ",
			zipcode: "07030",
			age: "25"
			}
		
	    rtn = await users.setUser(jset);
	  
	    
		const newPet1 = {
        petName: "Geralt",
        petType: "dog",
        color : "black",
        breed : "lab",
        age : "2",
        description: " description ",
        img: "dog5.jfif" ,
        price: "900",
        status: "available"
		};

		rtn = await pets.addPet("",newPet1);
	  
		const newPet2 = {
        petName: "Cirilla",
        petType: "dog",
        color : "golden",
        breed : "golden",
        age : "2",
        description: " description ",
        img: "dog4.jfif" ,
        price: "1000",
        status: "available"
		};

		rtn = await pets.addPet("",newPet2);
		
		const newPet3 = {
        petName: "Yennefer",
        petType: "dog",
        color : "black",
        breed : "lab",
        age : "2",
        description: " description ",
        img: "dog3.jfif" ,
        price: "1000",
        status: "available"
		};

		rtn = await pets.addPet("",newPet3);
		
		const newPet4 = {
        petName: "Harry",
        petType: "dog",
        color : "white",
        breed : "lab",
        age : "1",
        description: " description ",
        img: "dog1.jfif" ,
        price: "500",
        status: "available"
		};

		rtn = await pets.addPet("",newPet4);
		
		const newPet5 = {
        petName: "Zayn",
        petType: "dog",
        color : "white",
        breed : "yorkie",
        age : "3",
        description: " description ",
        img: "dog6.jpg" ,
        price: "1000",
        status: "available"
		};

		rtn = await pets.addPet("",newPet5);
		
		
		const newPet6 = {
        petName: "Louis",
        petType: "cat",
        color : "black",
        breed : "common",
        age : "2",
        description: " description ",
        img: "cat1.jfif" ,
        price: "100",
        status: "available"
		};

		rtn = await pets.addPet("",newPet6);
	  
        const newPet7 = {
        petName: "Liam",
        petType: "cat",
        color : "golden",
        breed : "common",
        age : "3",
        description: " description ",
        img: "cat2.jfif" ,
        price: "100",
        status: "available"
		};

		rtn = await pets.addPet("",newPet7);
		
		
		const newPet8 = {
        petName: "Niall",
        petType: "cat",
        color : "gray",
        breed : "common",
        age : "1",
        description: " description ",
        img: "cat3.jfif" ,
        price: "300",
        status: "available"
		};

		rtn = await pets.addPet("",newPet8);
		
		const newPet9 = {
        petName: "Dandelion",
        petType: "cat",
        color : "brown",
        breed : "common",
        age : "5",
        description: " description ",
        img: "cat5.jfif" ,
        price: "100",
        status: "available"
		};

		rtn = await pets.addPet("",newPet9);
		
		
		userId = "jamie10";
		let pay1 = {
                cardName: "Jamie Sham",
                cardNumber: "1111-1234-1234-1234",
                cardType : "credit",
                cardBank : "Chase",
                expDate : "03/25",
                description: "desc1"
            };
		
		 let rtnArray1 = await payments.setPayment(userId,pay1);
		 
		let pay2 = {
                cardName: "Jamie Sham",
                cardNumber: "2222-1234-1234-1234",
                cardType : "credit",
                cardBank : "Amex",
                expDate : "05/26",
                description: "desc2"
            };
		
		 let rtnArray2 = await payments.setPayment(userId,pay2);
		
		let pay3 = {
                cardName: "Jamie Sham",
                cardNumber: "3333-1234-1234-1234",
                cardType : "debit",
                cardBank : "Citi",
                expDate : "07/27",
                description: "desc3"
            };
		
		 let rtnArray3 = await payments.setPayment(userId,pay3);

    } catch (error) {
        //console.error(error);
        console.error("Get Error Done: "+ error );
        console.error("Seeding database Failed");
    }

    console.log('Done seeding database');

    //await db.serverConfig.close();
    await dbConnection.closeConnection();
  }
  
  main();    
