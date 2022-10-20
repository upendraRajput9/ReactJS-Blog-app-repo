import axios from "axios";
import React from "react";
import { ROOT_URL } from "./utilits/constant";
import { Link,useNavigate} from "react-router-dom";
import validate from "./validate";

const api = axios.create({
    baseURL:ROOT_URL
})
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

//OnSubmit
handleSubmit= async (event)=>{
    let {email,password}=this.state
    event.preventDefault()
    // let navigate = useNavigate();
 let user= {
        user:{
          email,
          password
        }
      }
      let res = await api.post("/api/users/login",user)
    await  localStorage.setItem('jwt', res.data.user.token);
      this.setState({
        email:"",
        password:""
      })
     
}

    render(){
        let {email,password,errors}=this.state
        // console.log(username,email,password,errors)
        return(
            <form onSubmit={this.handleSubmit}>
                <span className="error">{errors.email}</span>
                <input onChange={this.handleInput} value={email} type="email" name="email" placeholder="Email"/>
                <span className="error">{errors.password}</span>
                <input onChange={this.handleInput} value={password} type="password" name="password" placeholder="Password"/>
                <input type="submit" disabled={!email||!password||errors.email||errors.password} value="Submit" />
            </form>
        )
    }
}