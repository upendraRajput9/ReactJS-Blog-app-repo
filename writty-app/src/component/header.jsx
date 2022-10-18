import React from "react";
import { NavLink } from "react-router-dom";

export default class Header extends React.Component{
constructor(props){
    super(props)
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
                <li>
                    <NavLink>Setting</NavLink>
                </li>
                <li>
                    <NavLink>User</NavLink>
                </li>
                <li>
                    <NavLink to="/signIn">Sign in</NavLink>
                </li>
                <li>
                    <NavLink to="/signUp">Sign up</NavLink>
                </li>
            </ul>
        </nav>
       </header>
    )
}
}