import axios from "axios";
import React from "react";
import { ROOT_URL } from "./utilits/constant";
import { useNavigate } from "react-router-dom";
import validate from "./validate";
import UserContext from "./userContext";

const api = axios.create({
    baseURL: ROOT_URL
})
class SignInComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errors: {
                email: "",
                password: "",
            }
        }

    }
    handleInput = (event) => {
        event.preventDefault()
        let errors = { ...this.state.errors }
        let { name, value } = event.target
        validate(errors, name, value)
        this.setState({
            [name]: value, errors
        })
    }

    //OnSubmit
    handleSubmit = async (event) => {
        let { email, password } = this.state
        event.preventDefault()

        let user = {
            user: {
                email,
                password
            }
        }
        await api.post("/api/users/login", user)
            .then(res => {
                let { user } = res.data
                this.props.updateUser(user)
                this.props.navigate("/")
            })
            .catch(error => this.setState({errors:{email:"email or password is not valid" }}))
        
    }

    render() {
        let { email, password, errors } = this.state

        return (
            <section className="sign-section new-post container">
            <figure>
               <img src="https://images.unsplash.com/photo-1583337260546-28b6bf66d004?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjAwfHxkb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"  />
           </figure>
            <form className="sign-form" onSubmit={this.handleSubmit}>
                <span className="error">{errors.email}</span>
                <input onChange={this.handleInput} value={email} type="email" name="email" placeholder="Email" />
                <span className="error">{errors.password}</span>
                <input onChange={this.handleInput} value={password} type="password" name="password" placeholder="Password" />
                <input type="submit" disabled={!email || !password || errors.email || errors.password} value="Sign In" />
            </form>
            </section>
        )
    }
}

const SignIn = () => {
    const navigate = useNavigate()
    return (
        <UserContext.Consumer>{
            (props)=>
        <SignInComponent navigate={navigate} updateUser={props.updateUser} />
    }</UserContext.Consumer>
    )
}
export default SignIn