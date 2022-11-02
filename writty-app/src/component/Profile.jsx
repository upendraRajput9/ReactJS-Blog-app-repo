import axios from "axios";
import HomePrivate from "./HomePrivate";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { ROOT_URL, articlesURL } from "./utilits/constant";
import { Component } from "react";

const jwt = localStorage.getItem("jwtKey")
const api = axios.create({
    baseURL: ROOT_URL,
    headers: {
        "Content-Type": "application/json",
        authorization: `Token ${jwt}`,
    }
})

function Profile(props) {
    let param = useParams()
    let [profile, setUser] = useState(null)
    const [username, setUsername] = useState(param.username)
    function fetch() {
        api.get(`/api/profiles/${username}`)
            .then(res => setUser(res.data.profile))
    }


const handlefollow= async ()=>{
await api.post(`/api/profiles/${username}/follow`)
.then(res => setUser(res.data.profile))
            .catch(err => console.log(err))
}
const handleUnfollow= async ()=>{
    await api.delete(`/api/profiles/${username}/follow`)
    .then(res => setUser(res.data.profile))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetch()
    }, [username])
    if (!profile) {
        return ( <main className="home container">
        <h1>Loading...</h1>
        </main>)
    }
    if (param.username !== username) {
        setUsername(param.username)
    }
    
    return (
        <section className="profile-section">
            <div className="profile-div">
                <article>
                <figure className="author-profile">
                    <img src={profile.image} alt="user" />
                </figure>
                
            <h1>{profile.username}</h1>
 <p>{profile.bio}</p>
            {props.currentUser?profile.username === props.currentUser.username ?
                <button className="button4"><i class="fa-solid fa-gear"></i> <NavLink to="/setting">Edit Profile</NavLink></button> :
                <button onClick={profile.following ?handleUnfollow:handlefollow} className="button4">{profile.following ? "+ Unfollow" : '+ Follow'} {profile.username}</button>:""
            }
            </article>
            </div>
            <HomePrivate {...props} username={profile.username} />
        </section>
    )
}


export default Profile