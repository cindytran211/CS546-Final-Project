const mongoCollections= require('../config/mongoCollections');
const users=mongoCollections.users;
const { ObjectId }=require('mongodb');
const bcrypt=require('bcrypt');
const validation = require('../validation');

let exportedMethos=
{
    async createUser(firstname,lastname,email,age,street,city,state,zipcode,phonenumber,username,password)
    {
        firstname=validation.checkFirstName(firstname);
        lastname=validation.checkLastName(lastname);
        age=validation.checkAge(age);
        street=validation.checkStreet(street);
        city=validation.checkCity(city);
        state=validation.checkState(state);
        zipcode=validation.checkZipcode(zipcode);
        phonenumber=validation.checkPhoneNumber(phonenumber);
        username=validation.checkUserName(username);
        password=validation.checkPassWord(password);
        email=validation.checkEmail(email);
        //const newUserName=username.toLowerCase();
        const usersCollection= await users();
        const findUser=await usersCollection.find({username: username}).toArray();
        if(findUser.length==0)
        {
            const saltRounds=16;
            const hash=await bcrypt.hash(password,saltRounds);
            const holder=
            {
                username: username,
                password: hash,
                firstname: firstname,
                lastname: lastname,
                email: email,
                age: age,
                street: street,
                city: city,
                state: state,
                zipcode: zipcode,
                mobilephone: phonenumber,
                payments: [],
            }
            const newUser=await usersCollection.insertOne(holder);
            if(!newUser.acknowledged || !newUser.insertedId)
            {
                throw "Error: Could not Add User"
            }
            const inserted=
            {
                userInserted: true
            }
            return inserted;
        }
        else
        {
            throw "Error: There is Already A User With That UserName"
        }
    },
    async checkUser(username,password)
    {
        username=validation.checkUserName(username);
        password=validation.checkPassWord(password);
        //const newUserName=username.toLowerCase();
        const usersCollection= await users();
        const findUser=await usersCollection.find({username: username}).toArray();
        if(!findUser)
        {
            throw "Error: Either the username or password is invalid"
        }
        else
        {
            const comparePasswords=await bcrypt.compare(password,findUser[0].password);
            if(comparePasswords)
            {
                const holder=
                {
                    authenticated: true
                }
                return holder;
            }
            else
            {
                throw "Error: Either the username or password is invalid"
            }
        }
    },
    async deleteUser(username)
    {
        username=validation.checkUserName(username);
        const usersCollection= await users();
        const deletionInfo=await usersCollection.deleteOne({username: username});
        if(deletionInfo.deletedCount===0)
        {
            throw 'Error: Could not delete user';
        }
        return username;
    },
    async findUser(username)
    {
        username=validation.checkUserName(username);
        const usersCollection= await users();
        const findUser=await usersCollection.find({username: username}).toArray();
        if(!findUser)
        {
            throw "Error: Cannot find user"
        }
        else
        {
            return findUser;
        }
    },
    async updateUser(firstname,lastname,email,age,street,city,state,zipcode,phonenumber,username,password)
    {
        const saltRounds=16;
        const hash=await bcrypt.hash(password,saltRounds);
        const oldUser=await this.findUser(username);
        const newUserInfo=
        {
            username: username,
            password: hash,
            firstname: firstname,
            lastname: lastname,
            email: email,
            age: age,
            street: street,
            city: city,
            state: state,
            zipcode: zipcode,
            mobilephone: phonenumber,
            payments: oldUser[0].payments,
        }
        const userCollection=await users();
        const updateInfo=await userCollection.updateOne(
            {_id:oldUser[0]._id},{$set:newUserInfo}
        );
        if(!updateInfo.matchedCount && !updateInfo.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return newUserInfo;
    }
};

module.exports=exportedMethos;
