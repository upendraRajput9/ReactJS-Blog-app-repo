import React from "react";
import validate from "./validate";


export default class SignIn extends React.Component{
    constructor(props){
        super(props)
       this.state={
            email:"",
            password:"",
            errors:{
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
        // console.log(username,email,password,errors)
        return(
            <form>
                <span className="error">{errors.email}</span>
                <input onChange={this.handleInput} value={email} type="email" name="email" placeholder="Email"/>
                <span className="error">{errors.password}</span>
                <input onChange={this.handleInput} value={password} type="password" name="password" placeholder="Password"/>
                <input type="submit" disabled={errors.email||errors.password} value="Submit"/>
            </form>
        )
    }
}