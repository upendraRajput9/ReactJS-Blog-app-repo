export default function validate(errors,name,value){
    switch(name){
        case "username":
            let usernameError=value.length>=6?"":"Username cant be less than 6 characters"
    errors.username=usernameError
            break;
        case "email":
    let emailError=value.indexOf("@")===-1?"Email doesn't contain @":""
    errors.email=emailError
            break;
            case "password":
                let passwordError="";
                if(value.length<7){
                    passwordError= "password can't be less than 6 character"
                }
                let regax = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
                if(!regax.test(value)){
                    passwordError="Password must contain a at least one upper case,lower case letter and a number"
                }
                errors.password=passwordError
    
            break;
            default:
                return errors
    }
}