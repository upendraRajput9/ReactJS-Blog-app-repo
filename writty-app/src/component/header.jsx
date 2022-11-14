import React from "react";
import { NavLink,Link } from "react-router-dom";
import UserContext from "./userContext";

export default class Header extends React.Component {
static contextType = UserContext

    render() {
        return (
            <header>
                <div className="header container">
                    <Link  to="/">  <h1>Writty</h1></Link>
                    <nav>
                        <ul>{
                            this.context.isLoggedIn ? <AfterSigned/> : <Signed/>
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
                <NavLink end to="/"
                  >Home</NavLink>
            </li>
            <li>
                <NavLink to="signIn"
                 >Sign in</NavLink>
            </li>
            <li>
                <NavLink to="signUp"
                  >Sign up</NavLink>
            </li>
        </React.Fragment>

    )
}

function AfterSigned() {
    return (
        <UserContext.Consumer>{
(props)=>
        <React.Fragment>
            <li >
                <NavLink end to="/"
                >Home</NavLink>
            </li>
            <li>
                <NavLink to="editor"
                 ><i className="fa-solid fa-square-pen"></i> New Post</NavLink>
            </li>
            <li>
                <NavLink
                    to="setting"
                  ><i className="fa-solid fa-gear"></i>  Setting</NavLink>
            </li>
            <li>
                <NavLink
                     to={`${props.currentUser.username}`}
                  >
                    <p>{props.currentUser.username.length < 30 ? props.currentUser.username : props.currentUser.username.slice(0, 30) + "..."}</p>
                    {<figure>
                        <img src={props.currentUser ? props.currentUser.image : "/"} alt="user" />
                    </figure>}
                </NavLink>
            </li>
        </React.Fragment>
}</UserContext.Consumer>
    )
}