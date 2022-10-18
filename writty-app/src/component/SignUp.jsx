import React from "react";
import validate from "./validate";


export default class SignUp extends React.Component{
    constructor(props){
        super(props)
       this.state={
            username:"",
            email:"",
            password:"",
            errors:{
                username:"",
                email:"",
                password:"",
            }
    }
    
    }
handleInput=(event)=>{
event.preventDefault()
let errors = {...this.state.errors}
let {name,value}=event.target
validate(errors,name,value)
this.setState({
    [name]:value,errors
})
}
    render(){
        let {username,email,password,errors}=this.state
        
        return(
            <form>
                <span className="error">{errors.username}</span>
                <input onChange={this.handleInput} value={username} type="text" name="username" placeholder="Username"/>
                <span className="error">{errors.email}</span>
                <input onChange={this.handleInput} value={email} type="email" name="email" placeholder="Email"/>
                <span className="error">{errors.password}</span>
                <input onChange={this.handleInput} value={password} type="password" name="password" placeholder="Password"/>
                <input type="submit" disabled={errors.email||errors.password||errors.username} value="Submit"/>
            </form>
        )
    }
}