import { Component} from "react"
import { Route, Routes,Router } from "react-router-dom"
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
import UserContext from "./userContext";



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
        let contextValues = {currentUser:this.state.user, isLoggedIn:isLoggedIn,updateUser:this.updateUser,logoutUser:this.logoutUser,currentUser:this.state.user}
        return (
            <>
            <UserContext.Provider value={contextValues} >
                <Header />
                {isLoggedIn ? < Authorized /> : <Unauthorized />}
                </UserContext.Provider>
            </>
        )
    }
}



const Authorized = (Props) => {
    return (
       
        <Routes>
            <Route path="/" element={<Home />} />
            <Route  path="editor/*" element={<NewPost />} />
            <Route  path="editor/:slug/*" element={<NewPost/>} />
            <Route  path="setting/*" element={<Setting/>} />
            <Route  path="article/:slug/*" element={<SingleArticle/>} />
            <Route  path=":username/*" element={<Profile/>} />
        </Routes>
       )
}

const Unauthorized = (Props) => {
    return (
        <Routes>
            <Route  path="/" element={<Home />} />
            <Route path="article/:slug/*" element={<SingleArticle/>} />
            <Route path="signUp/*" element={<SignUp/>} />
            <Route path=":username/*" element={<Profile/>} />
            <Route path="signIn/*" element={<SignIn />} />
        </Routes>)
}