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
     }
}
