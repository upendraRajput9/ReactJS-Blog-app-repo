import React from "react";
import axios from "axios";
import { ROOT_URL } from "./utilits/constant";
import validate from "./validate";

const api = axios.create({
    baseURL:ROOT_URL
})

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

//OnSubmit
handleSubmit= async (event)=>{
    let {email,password,username}=this.state
    event.preventDefault()
 let user= {
        user:{
          username,
          email,
          password
        }
      }
      let res = await api.post("/api/users",user)
      localStorage.setItem('jwt', res.data.user.token);
      console.log(res)
}
    render(){
        let {username,email,password,errors}=this.state
        
        return(
            <form onSubmit={this.handleSubmit}>
                <span className="error">{errors.username}</span>
                <input onChange={this.handleInput} value={username} type="text" name="username" placeholder="Username"/>
                <span className="error">{errors.email}</span>
                <input onChange={this.handleInput} value={email} type="email" name="email" placeholder="Email"/>
                <span className="error">{errors.password}</span>
                <input onChange={this.handleInput} value={password} type="password" name="password" placeholder="Password"/>
                <input type="submit" disabled={!email||!password||!username||errors.email||errors.password||errors.username} value="Submit"/>
            </form>
        )
    }
}