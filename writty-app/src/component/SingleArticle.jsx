import React, { useState, useEffect } from "react";
import CommentList from "./commentList";
import { ROOT_URL, articlesURL } from "./utilits/constant";
import { Route, useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "./userContext";

function SingleArticle() {
    const [article, setArticle] = useState(null)
    const [{ slug }, setSlug] = useState(useParams())
    const [error, setError] = useState("")
    let navigate = useNavigate()
    function fetch() {
        axios.get(articlesURL + `/${slug}`)
            .then(res => {
                setArticle(res.data.article)
                setError("")
            })
            .catch(err => {
                setError("not able to fetch article")

            })
    }
    let handleDelete = async () => {
        const jwt = localStorage.getItem("jwtKey")
        const api = axios.create({
            baseURL: articlesURL,
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${jwt}`,
            }
        })
        await api.delete(`/${slug}`)
        navigate("/")
    }

    useEffect(() => {
        fetch()
    }, [])
    if (error) {
        return error
    }
    if (!article) {
        return ( <main className="home container">
        <h1>Loading...</h1>
        </main>)
    }

    
        let dl = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        let ml = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let date = new Date(article.createdAt)
    return (
    <UserContext.Consumer>{
        (props)=>
    <section className="singleArticle">
    <div>
       
        <header>
        <h2 className=" container">{article.title}</h2>
            <div className="container">
                <div className="profile-pic">
                        <figure>
                            <img src={article.author.image} alt="author" />
                        </figure>
                        <div>
                            <h4><Link to={`/${article.author.username}`}>
                                {article.author.username}
                            </Link></h4>
                            <time>{dl[date.getDay()].slice(0, 3)} {ml[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</time>
                            </div>
                            </div>
                            {
            props.currentUser && article.author.username === props.currentUser.username ?
                <div className="edit-delete-btn">
                    <button className="edit-btn">
                        <Link
                            to={`/editor/${article.slug}`}
                            state={article}
                        >Edit</Link>
                    </button>
                    <button className="delete-btn" onClick={handleDelete}>Delete Article</button>
                </div> : ""

        }
                       
                        </div>
                       
                </header>
        </div>
        <section className="container article-body">
            <article>
        <p>{article.body}</p>
        <ul>
        {
           
            article.tagList.map(tag=><span>{tag}</span>)
        }
        </ul>
        </article> 
        </section>
        <section className="comment-section">
        <CommentList {...props} slug={slug} />
        </section>
    </section>
    }</UserContext.Consumer>
    )
    

}
export default SingleArticle
