import {Component} from "react"
import { Route,Routes } from "react-router-dom"
import Header from "./header"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import NewPost from "./NewPost.jsx"
import Setting from "./Setting"
import SingleArticle from "./SingleArticle"
import Home from "./Home"

export default class APP extends Component{
    
    render(){

        return(
            <>
            <Header/>
<Routes>
            <Route path="/" element={<Home/>} exact />
            <Route path="/editor" element={<NewPost/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/signIn" element={<SignIn/>}/>
            <Route path="/setting" element={<Setting/>}/>
            <Route path="/article/:slug"  element={<SingleArticle/>}/>

            </Routes>
            </>
        )
    }
}