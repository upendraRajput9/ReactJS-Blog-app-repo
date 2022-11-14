import React from "react";
import axios from "axios";
import validate from "./validate";
import { ROOT_URL } from "./utilits/constant"
import { useNavigate } from "react-router-dom";
import UserContext from "./userContext";


const jwt = localStorage.getItem("jwtKey")
const api = axios.create({
    baseURL: ROOT_URL,
    headers: {
        "Content-Type": "application/json",
        authorization: `Token ${jwt}`,
    }
})
class SettingComponent extends React.PureComponent {

    static contextType = UserContext
    constructor(props, history) {
        super(props)
        this.state = {
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
    }
    handleInput = () => {

    }
    //componentDidMount
    componentDidMount() {
        let { username, image, bio, email } = this.context.currentUser
        this.setState({ username, image, bio, email })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let { username, email, password, image, bio } = this.state
        let user = { user: password ? { username, email, password, image, bio } : { username, email, image, bio } }
        await api.put("/api/user", user)
            .then(res => this.context.updateUser(res.data.user))
            .catch(error => console.log(error))
        this.props.navigate("/")
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
        localStorage.removeItem("jwtKey")
        this.context.logoutUser()
        this.props.navigate("/")
    }
    render() {
        let { username, email, password, image, bio, errors } = this.state
        return (<section className="setting-section new-post container">
             <figure>
                <img src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"  />
            </figure>
            <form onSubmit={this.handleSubmit}>
                <span className="error">{errors.username}</span>
                <span className="error">{errors.email}</span>
                <span className="error">{errors.password}</span>
                <input onChange={this.handleInput} type="text" value={image} name="image" placeholder="URL of profile profile picture" />
                <input onChange={this.handleInput} value={username} type="text" name="username" placeholder="Username" />
                <input onChange={this.handleInput} value={email} type="email" name="email" placeholder="Email" />
                <input onChange={this.handleInput} value={password} type="password" name="password" placeholder="Password" />
                <textarea onChange={this.handleInput} name="bio" value={bio} />
                <input type="submit" disabled={!email || !username || errors.email || errors.password || errors.username} value="Update Settings" />
                <button onClick={this.handleLogout} >LogOut</button>
            </form>
            
        </section>
        )
    }
}

function Setting(props) {
    const navigate = useNavigate()
    return (
        <SettingComponent navigate={navigate}  />
    )
}

export default Setting