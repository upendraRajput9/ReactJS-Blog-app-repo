import { useEffect,useState } from "react";
import axios from "axios";
import { ROOT_URL } from "./utilits/constant";

let jwt = localStorage.getItem("jwt")
const api = axios.create({
    baseURL:ROOT_URL,
    headers:{
        "Content-Type": "application/json",
        authorization: `Token ${jwt}`,
    }

})
 const LoginUser=async()=>{
  let value=null
 await   api.get("/api/user")
    .then(res=>{
        value=res
    })
return value
   
}

export default LoginUser

