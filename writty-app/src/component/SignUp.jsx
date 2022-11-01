import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROOT_URL } from "./utilits/constant";
import validate from "./validate";

const api = axios.create({
    baseURL: ROOT_URL
})

class SignUpComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            errors: {
                username: "",
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
        let { email, password, username } = this.state
        event.preventDefault()
        let user = {
            user: {
                username,
                email,
                password
            }
        }
        await api.post("/api/users", user)
            .then(res => {
                let { user } = res.data
                this.props.updateUser(user)
            })
            .catch(error => {
                let { errors } = error.response.data
                console.log(errors)
            })
        this.props.navigate('/')
    }
    render() {
        let { username, email, password, errors } = this.state

        return (
            <section className="sign-section new-post container">
            <figure>
               <img src="https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODF8fGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"  />
           </figure>
            <form onSubmit={this.handleSubmit}>
                <span className="error">{errors.username}</span>
                <input onChange={this.handleInput} value={username} type="text" name="username" placeholder="Username" />
                <span className="error">{errors.email}</span>
                <input onChange={this.handleInput} value={email} type="email" name="email" placeholder="Email" />
                <span className="error">{errors.password}</span>
                <input onChange={this.handleInput} value={password} type="password" name="password" placeholder="Password" />
                <input type="submit" disabled={errors.email || errors.password || errors.username} value="Sign Up" />
            </form>
            </section>
        )
    }
}

const SignUp = (Props) => {
    const navigate = useNavigate()
    return (
        <SignUpComponent navigate={navigate} updateUser={Props.updateUser} />
    )
}
export default SignUp