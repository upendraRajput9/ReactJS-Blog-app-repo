import React, { useState, useEffect } from "react";
import { ROOT_URL, articlesURL } from "./utilits/constant";
import { Route, useParams } from "react-router-dom";
import axios from "axios";

function SingleArticle (Props){
const[article,setArticle]=useState(null)
const[{slug},setSlug]=useState(useParams())
const[error,setError]=useState("")
   function fetch() {
        axios.get(articlesURL+`/${slug}`)
            .then(res => {
                setArticle(res.data.article)
               setError("")
            })
            .catch(err => {
                setError("not able to fetch article")
              
            })
    }
    useEffect(() => {
        fetch()
    },[])
if(error){
    return error
}

    return (
        <h2>{article?article.title:""}</h2>
    )

}
export default SingleArticle
