import { Component } from "react"
import { Route, Routes } from "react-router-dom"
import axios from "axios";
import { ROOT_URL } from "./utilits/constant";
import Header from "./header"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import NewPost from "./NewPost.jsx"
import Setting from "./Setting"
import SingleArticle from "./SingleArticle"
import Home from "./Home"
import Profile from "./Profile";


const api = axios.create({
    baseURL: ROOT_URL
})

export default class APP extends Component {
    state = {
        user: null,
        isLoggedIn: false,
        isverifying: true,
    }
    componentDidMount() {
        let jwtKey = localStorage.getItem("jwtKey")
        if (jwtKey) {
            const api = axios.create({
                baseURL: ROOT_URL,
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Token ${jwtKey}`,
                }
            })
            api.get('/api/user')
                .then(res => {
                    let { user } = res.data
                    this.updateUser(user)
                })
                .catch(error => console.log(error))
        } else {
            this.setState({ isverifying: false })
        }
    }




    updateUser = (user) => {
        this.setState({ isLoggedIn: true, user, isverifying: false })
        localStorage.setItem("jwtKey", user.token)
    }

    //Logout
    logoutUser = () => {
        this.setState({ user: null, isLoggedIn: false, })
    }
    render() {
        let { isLoggedIn } = this.state
        return (
            <>
                <Header currentUser={this.state.user} isLoggedIn={isLoggedIn} />
                {isLoggedIn ? < Authorized updateUser={this.updateUser} logoutUser={this.logoutUser} currentUser={this.state.user} /> : <Unauthorized updateUser={this.updateUser} />}
            </>
        )
    }
}



const Authorized = (Props) => {
    return (
        <Routes>
            <Route exact path="/" element={<Home {...Props} />} />
            <Route exact path="/editor" element={<NewPost {...Props} />} />
            <Route exact path="/editor/:slug" element={<NewPost {...Props} />} />
            <Route exact path="/setting" element={<Setting {...Props} />} />
            <Route exact path="/article/:slug" element={<SingleArticle {...Props} />} />
            <Route exact path="/:username" element={<Profile {...Props} />} />
        </Routes>)
}

const Unauthorized = (Props) => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />}  />
            <Route exact path="/article/:slug" element={<SingleArticle {...Props} />} />
            <Route exact path="/signUp" element={<SignUp updateUser={Props.updateUser} />} />
            <Route exact path="/:username" element={<Profile {...Props} />} />
            <Route exact path="/signIn" element={<SignIn updateUser={Props.updateUser} />} />
        </Routes>)
}