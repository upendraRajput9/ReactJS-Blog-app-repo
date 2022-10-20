import React from "react";
import { NavLink } from "react-router-dom";
import LoginUser from "./loginedUser";
// import LoginUser from "./loginedUser";uz

export default class Header extends React.Component{
constructor(props){
    super(props)
    this.state={
        currentUser:null
    }
}

signed=()=>{
    return(
        <>
        <li>
            <NavLink to="/signIn">Sign in</NavLink>
        </li>
        <li>
            <NavLink to="/signUp">Sign up</NavLink>
        </li>
        </>
    )
}
//
afterSigned = ()=>{
    
    let promise = LoginUser()
    promise.then((message)=>{
        this.setState({ currentUser:message.data.user})
    }).catch((error)=>{
        return error
    })
    
      return(
    <>
    <li>
        <NavLink to="/setting">Setting</NavLink>
    </li>
    <li>
        <figure>
            <img src={this.state.currentUser?this.state.currentUser.image:"/"} alt="user" />
        </figure>
        <p><NavLink to="/setting">{this.state.currentUser?this.state.currentUser.username:""}</NavLink></p>
    </li>
    </>
    )
}
render(){
    return(
       <header>
        <h1>Writty</h1>
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/editor">New Post</NavLink>
                </li>
{localStorage.getItem('jwt')?this.afterSigned():this.signed()
                }
            </ul>
        </nav>
       </header>
    )
}
}