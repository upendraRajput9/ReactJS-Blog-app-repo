import React from "react";
import axios from "axios";
import { articlesURL } from "./utilits/constant";
import { useLocation, useNavigate } from "react-router-dom";

const jwt = localStorage.getItem("jwtKey")
const api = axios.create({
    baseURL: articlesURL,
    headers: {
        "Content-Type": "application/json",
        authorization: `Token ${jwt}`,
    }
})

const NewPost = (Props) => {
    let location = useLocation()
    let { state } = location
    const navigate = useNavigate()
    const [article, setArticle] = React.useState({
        title: "",
        description: "",
        body: "",
        tagList: []
    })
    React.useEffect(() => {
        console.log(state)
        if (state) {
            console.log(state);
            let { title, description, body, tagList } = state
            tagList = tagList.join(",")
            setArticle({ title, description, body, tagList })
        } else {
            setArticle({
                title: "",
                description: "",
                body: "",
                tagList: []
            })
        }
    }, [state])

    const handleInput = (event) => {
        event.preventDefault();
        let { name, value } = event.target
        console.log(name, value)
        if (name === "tagList") {
            value = value.split(/[, ]+/)
        }
        setArticle(
            { ...article, [name]: value }
        )
    }
    //handleSubmit
    const handleSubmit = (event) => {
        event.preventDefault()
        if (state) {
            api.put(`/${state.slug}`, { article })
                .then(res => navigate(`/article/${res.data.article.slug}`))
        } else {
            api.post('/', { article })
                .then(res => navigate(`/article/${res.data.article.slug}`))
        }
        setArticle({
            title: "",
            description: "",
            body: "",
            tagList: []
        })

    }

    let { title, description, body, tagList } = article
    return (
        <section className="new-post container">
            <figure>
                <img src="https://images.unsplash.com/photo-1538650438361-acc2e703c17b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGluc3BpcmF0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"  />
            </figure>
        <form onSubmit={handleSubmit}>
            <input value={title} type="text" name="title" onChange={handleInput} placeholder="Article tiltle.." />
            <input value={description} type="text" name="description" onChange={handleInput} placeholder="What's this Article About?" />
            <textarea value={body} type='text' name="body" onChange={handleInput} placeholder="Write your article(in markdown)" />
            <input value={tagList} type="text" name="tagList" onChange={handleInput} placeholder="Enter tags" />
            <input type="submit" value="Publish Article" />
        </form>
        </section>
    )
}
export default NewPost