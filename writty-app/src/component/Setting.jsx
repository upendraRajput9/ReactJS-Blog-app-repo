import React from "react";
import axios from "axios";
import validate from "./validate";
import { ROOT_URL } from "./utilits/constant"
import LoginUser from "./loginedUser";

const jwt = localStorage.getItem("jwt")
const api = axios.create({
    baseURL: ROOT_URL,
    headers:{
        "Content-Type": "application/json",
        authorization: `Token ${jwt}`,
    }
})
class Setting extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        image: "",
        bio: "",
        errors: {
            username: "",
            email: "",
            password: "",
        }
    }
    handleInput = () => {

    }
    //componentDidMount
    componentDidMount() {
        let promise = LoginUser()
        promise.then((result) => {
            let { username, email, bio, image } = result ? result.data.user : ""
            this.setState({ username, email, bio, image })
        }).catch((error) => {
            return error
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
       let { username, email, password, image, bio } = this.state
        let user = { user:password? { username, email, password, image, bio }:{ username, email, image, bio }}
       await api.put("/api/user", user)
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
    handleLogout = () => {
        localStorage.removeItem('jwt');
    }
    render() {
        let { username, email, password, image, bio, errors } = this.state
        return (<>
            <form onSubmit={this.handleSubmit}>
                <span className="error">{errors.username}</span>
                <span className="error">{errors.email}</span>
                <span className="error">{errors.password}</span>
                <input onChange={this.handleInput} type="text" value={image} placeholder="URL of profile profile picture" />
                <input onChange={this.handleInput} value={username} type="text" name="username" placeholder="Username" />
                <input onChange={this.handleInput} value={email} type="email" name="email" placeholder="Email" />
                <input onChange={this.handleInput} value={password} type="password" name="password" placeholder="Password" />
                <textarea onChange={this.handleInput} name="bio" value={bio} />
                <input type="submit" disabled={!email || !username || errors.email || errors.password || errors.username} value="Update Settings" />
            </form>
            <button onClick={this.handleLogout} >LogOut</button>
        </>
        )
    }
}

export default Setting