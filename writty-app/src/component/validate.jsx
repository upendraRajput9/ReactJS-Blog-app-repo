export default function validate(errors, name, value) {
    switch (name) {
        case "username":
            let usernameError = value.length >= 6 ? "" : "Username cant be less than 6 characters"
            errors.username = usernameError
            break;
        case "email":
            let emailError = value.indexOf("@") === -1 ? "Email doesn't contain @" : ""
            errors.email = emailError
            break;
        case "password":
            let passwordError = "";
            if (value.length < 6) {
                passwordError = "password can't be less than 6 character"
            }

            errors.password = passwordError

            break;
        case "bio":
            break;
        case "image":
            break;
        default:
            return errors
    }
}