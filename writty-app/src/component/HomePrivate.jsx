import React, { Component } from "react";
import ArticleList from "./articleList";
import { articlesURL } from "./utilits/constant"
import Pagination from "./Pagination";
import FeedNav from "./feedNav";
import axios from "axios"


const jwt = localStorage.getItem("jwtKey");
const api = axios.create({
    baseURL: articlesURL,
    headers: {
        "Content-Type": "application/json",
        authorization: jwt&&`Token ${jwt}`,
    },

})



export default class HomePrivate extends Component {

    state = {
        articlesData: null,
        limit: 5,
        offset: 0,
        error: "",
        activeTab: "author"
    }


    //Tag
    //addTag
    handleArticle = (type) => {
        this.setState({
            activeTab: type,
            offset: 0,
        })
    }

    //Handle Offset button Click
    handleOffsetBtn = (num) => {
        num = this.state.limit * num
        this.setState({
            offset: num
        })
    }


    handlefeed = (feed) => {
        this.setState({
            tag: null,
            activeTab: feed
        })
    }
    // GlobalFetch
    globalFetch = async () => {
        let { limit, offset, activeTab, tag } = this.state
        let { username } = this.props
        api.get(`/?limit=${limit}&offset=${offset}&${activeTab}=${username}`)
            .then(res => {
                this.setState({
                    articlesData: res.data.articles,
                    articlesCount: res.data.articlesCount,
                    error: ""
                })
            })
            .catch(err => {
                this.setState({
                    error: "not able to fetch article"
                })
            })
    }


    //ComponentDidMount
    componentDidMount() {
        this.globalFetch()
    }

    //component Did Update
    componentDidUpdate(prevProps, prevState) {
        let { activeTab } = this.state
        if (prevState.offset !== this.state.offset || prevState.activeTab !== this.state.activeTab) {
            this.globalFetch()
        } else if (prevProps.username !== this.props.username) {
            this.setState({ activeTab: "author" })
            this.globalFetch()
        }
    }

    handleFavorite =async (slug)=>{
        await api.post(`/${slug}/favorite`)
       this.globalFetch()
    }
    handleUnfavorite= async (slug)=>{
        await api.delete(`/${slug}/favorite`)
        this.globalFetch()
    }

    render() {
        let { articlesData, tag, articlesCount, error, activeTab, limit } = this.state
        if (error) {
            return <p>{error}</p>
        }
        return (
            <section className="home-private">
                <FeedNav activeTab={activeTab} handleArticle={this.handleArticle} />
                {articlesData ? <>
                    <ArticleList handleFavorite={this.handleFavorite} handleUnfavorite={this.handleUnfavorite} articles={articlesData} />
                    <Pagination limit={limit} offset={this.handleOffsetBtn} articlesCount={articlesCount} />
                </> : ""
                }
            </section>
        )
    }
}