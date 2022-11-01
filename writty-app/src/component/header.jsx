import React from "react";
import { NavLink } from "react-router-dom";


export default class Header extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <header>
                <div className="header container">
                <NavLink to="/">  <h1>Writty</h1></NavLink>
                <nav>
                    <ul>{
                        this.props.isLoggedIn ? <AfterSigned {...this.props} /> : <Signed {...this.props} />
                        }</ul>
                </nav>
                </div>
            </header>
        )
    }
}

function Signed(props) {
    return (

        <React.Fragment>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/signIn">Sign in</NavLink>
            </li>
            <li>
                <NavLink to="/signUp">Sign up</NavLink>
            </li>
            </React.Fragment>

    )
}

function AfterSigned(props) {
    return (
        <React.Fragment>
            <li>
                <NavLink 
                exact
                to="/"
                 className={({ isActive }) => (isActive ? 'shadow' : 'inactive')}
                
                >Home</NavLink>
            </li>
            <li>
                <NavLink 
                exact
                to="/editor"
                className={({ isActive }) => (isActive ? 'shadow' : 'inactive')}
                
                ><i class="fa-solid fa-square-pen"></i> New Post</NavLink>
            </li>
            <li>
                <NavLink 
                exact
                to="/setting"
                className={({ isActive }) => (isActive ? 'shadow' : 'inactive')}
             
                ><i class="fa-solid fa-gear"></i>  Setting</NavLink>
            </li>
            <li>
                <NavLink 
                exact
                to={`/${props.currentUser.username}`} 
                className={({ isActive }) => (isActive ? 'shadow' : 'inactive')}
                >
                    <p>{props.currentUser.username.length<30?props.currentUser.username:props.currentUser.username.slice(0,30)+"..."}</p>
                    {<figure>
                        <img src={props.currentUser ? props.currentUser.image : "/"} alt="user" />
                    </figure>}
                </NavLink>
            </li>
            </React.Fragment>
    )
}