import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { articlesURL } from "./utilits/constant"
import Comment from "./comment"
import NewComment from "./newComment"


const jwt = localStorage.getItem("jwtKey")
const api = axios.create({
    baseURL: articlesURL,
    headers: {
        "Content-Type": "application/json",
        authorization:jwt&&`Token ${jwt}`,
    }
})
const CommentList = (props) => {
    let [body, setItem] = useState(null)
    let [comments, setComment] = useState([])

    //handleInput
    const handleInput = (event) => {
        event.preventDefault()
        setItem(event.target.value)
    }


    const fetch = () => {
        api.get(`/${props.slug}/comments`)
            .then(res => setComment(res.data.comments))
            .catch(err => console.log(err))
    }

    //handlSubmit
    const handleSumit = (event) => {
        event.preventDefault()
        let comment = {
            comment: {
                body: body
            }
        }
        api.post(`/${props.slug}/comments`, comment)
            .then(res => console.log(res))
            .catch(err => console.log(err, "error"))
        fetch()
        setItem("")
    }

    //delete
   const handleDelete=(id)=>{
api.delete(`/${props.slug}/comments/${id}`)
fetch()
   }

//useEffect
    useEffect(() => {
        fetch()
    },[comments])

    return (
        <>{
        props.currentUser?
        <NewComment {...props} body={body} handleSumit={handleSumit} handleInput={handleInput} />:
        <p> <Link to="/signIn"> Sign in </Link>or<Link to="/signIn">  sign up</Link> to add comments on this article.</p>
        }
            {
                comments.map(comment =>  <Comment key={comment.id} user={props.currentUser&&props.currentUser.username===comment.author.username} handleDelete={()=>handleDelete(comment.id)}  {...comment} />)
            } </>
    )

}
export default CommentList