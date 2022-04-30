var validatior=require('email-validator');

module.exports=
{
     checkUserName(username)
     {
        if(username.length < 4 || !(/^[A-Za-z0-9]*$/.test(username)) || username.indexOf(" ")>-1)
        {
            throw 'Error: The Username is not in the correct format'
        }
        return username;
     },
     checkPassWord(password)
     {
         if(password.length<6 || password.indexOf(" ")>-1)
         {
            throw "Error: The Password is not in the correct format"
         }
         return password;
     },
     checkEmail(email)
     {
         if(validatior.validate(email))
         {
             return email
         }
         else
         {
             throw "Error: Email is not correct"
         }
     },
     checkFirstName(firstname)
     {
         if(( firstname == null) || (firstname.trim()=="") )
         {
             throw "Error: First Name is not in the correct format"
         }
         else
         {
            return firstname;
         }
     },
     checkLastName(lastname)
     {
         if (( lastname == null) || ( lastname.trim()==""))
         {
             throw "Error: Last Name is not in the correct format"
         }
         else
         {
             return lastname;
         }
     },
     checkAge(age)
     {
         if ( age == null)
            throw "Error: Age is not in the correct format"
         let stringage=age.toString();
         let newstring=stringage.replace(/0/g,"");
         if(newstring=="")
         {
             throw "Error: Age is not in the correct format"
         }
         else
         {
             return age;
         }
     },
     checkStreet(street)
     {
        if (( street == null) ||(street.trim()==""))
        {
            throw "Error: Street is not in the correct format"
        }
        else
        {
            return street;
        }
     },
     checkCity(city)
     {
        if (( city == null) ||(city.trim()==""))
        {
            throw "Error: City is not in the correct format"
        }
        else
        {
            return city;
        }
     },
     checkState(state)
     {
        if (( state  == null) ||(state.trim()==""))
        {
            throw "Error: State is not in the correct format"
        }
        else
        {
            return state;
        }
     },
     checkZipcode(zipcode)
     {
        if (( zipcode == null) ||(zipcode.trim()==""))
        {
            throw "Error: Zipcode is not in the correct format"
        }
        else
        {
            return zipcode;
        }
     },
     checkPhoneNumber(phonenumber)
     {
        if (( phonenumber == null) ||(phonenumber.trim()==""))
        {
            throw "Error: Phone Number is not in the correct format"
        }
        else
        {
            return phonenumber;
        }
     },
     checkString(str)
     {
         if(( str == null) || (str.trim()=="") )
         {
             throw "Error: String can not be empty"
         }
         else
         {
            return str;
         }
     },
     checkBank(str)
     {
         if(( str == null) || (str.trim()=="") )
         {
             throw "Error: Bank can not be empty"
         }
         else
         {
            return str;
         }
     },
     checkCardType(str)
     {
         if(( str == null) || (str.trim()=="") )
         {
             throw "Error: Card Type can not be empty"
         }
         else
         {
            return str;
         }
     },
     checkExpDate(str)
     {
        if(( str == null) || (str.trim()=="") )
        {
            throw "Error: Date String can not be empty"
        }
        else
        {
            let re = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
            const regex = new RegExp(re);
            if ( regex.test(str) == false )
                throw "Error: Date incorrect format"
        }
    },
    checkCardNumber(str)
    {    //[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}
        if(( str == null) || (str.trim()=="") )
        {
            throw "Error: Card NUmkber can not be empty"
        }
        else
        {
            let re = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
            const regex = new RegExp(re);
            if ( regex.test(str) == false )
                throw "Error: card Number incorrect format"
        }
    },
    /*
        validation.checkPetName(rb.petName);
        validation.checkColor(rb.color);
        validation.checkPetType(rb.petType);
        validation.checkAge(rb.age);
        validation.checkBreed(rb.breed);
        validation.checkPrice(rb.price);
        validation.checkStatus(rb.status);

    */
        checkPetName(petname)
        {
            if(( petname == null) || (petname.trim()=="") )
            {
                throw "Error: Pet Name is not in the correct format"
            }
            else
            {
               return petname;
            }
        },
        checkPetColor(petcolor)
        {
            if(( petcolor == null) || (petcolor.trim()=="") )
            {
                throw "Error: Pet Color is not in the correct format"
            }
            else
            {
               return petcolor;
            }
        },
        checkPetType(pettype)
        {
            if(( pettype == null) || (pettype.trim()=="") )
            {
                throw "Error: Pet Type is not in the correct format"
            }
            else
            {
               return pettype;
            }
        },
        checkPetAge(petage)
        {
            if(( petage == null) || (petage.trim()=="") )
            {
                throw "Error: Pet Age is not in the correct format"
            }
            else
            {
               return petage;
            }
        },
        checkPetBreed(petbreed)
        {
            if(( petbreed == null) || (petbreed.trim()=="") )
            {
                throw "Error: Pet Breed is not in the correct format"
            }
            else
            {
               return petbreed;
            }
        },
        checkPetPrice(petprice)
        {
            if(( petprice == null) || (petprice.trim()=="") )
            {
                throw "Error: Pet Price is not in the correct format"
            }
            else
            {
               return petprice;
            }
        },
        checkPetStatus(petstatus)
        {
            if(( petstatus == null) || (petstatus.trim()=="") )
            {
                throw "Error: Pet Status is not in the correct format"
            }
            else
            {
               return petstatus;
            }
        },        
}