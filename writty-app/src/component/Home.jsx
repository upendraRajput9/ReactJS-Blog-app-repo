import React, { Component } from "react";
import ArticleList from "./articleList";
import { articlesURL } from "./utilits/constant"
import Pagination from "./Pagination";
import Aside from "./aside"
import FeedNav from "./feedNav";
import axios from "axios"

const jwt = localStorage.getItem("jwtKey")

const api = axios.create({
    baseURL: articlesURL,
    headers: {
        "Content-Type": "application/json",
        authorization: `Token ${jwt}`,
    },

})

export default class Home extends Component {

    state = {
        articlesData: null,
        limit: 10,
        offset: 0,
        error: "",
        tag: null,
        activeTab: this.props.currentUser ? "yourFeed" : "globalFeed"
    }


    //Tag
    //addTag
    handleActiveTab = (tab) => {
        this.setState({
            activeTab: tab,
            offset: 0,
            tag: null
        })
    }

    //Handle Offset button Click
    handleOffsetBtn = (num) => {
        num = this.state.limit * num
        this.setState({
            offset: num
        })
    }

    //handleTag
    handleTags = (tag) => {
        this.setState({
            tag: tag,
            activeTab: tag
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

        api.get(`/?limit=${limit}&offset=${offset}${tag ? `&tag=${tag}` : ""}`)
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

    //your Feed
    yourFeed = async () => {
        let { limit, offset, activeTab } = this.state


        await api.get(`/feed`)
            .then(res => {
                this.setState({
                    articlesData: res.data.articles,
                    articlesCount: res.data.articlesCount,
                    error: ""
                })
            })
            .catch(err => {
                this.setState({
                    errors: "not able to fetch article"
                })
            })
    }


    //ComponentDidMount
    componentDidMount() {
        let { activeTab } = this.state
        //    console.log(api.get('/feed'))
        if (activeTab === "yourFeed") {
            this.yourFeed()
        } else {
            this.globalFetch()
        }

    }

    //component Did Update
    componentDidUpdate(prevProps, prevState) {
        let { activeTab } = this.state
        if (prevState.offset !== this.state.offset || prevState.activeTab !== this.state.activeTab) {
            if (activeTab === "yourFeed") {
                this.yourFeed()
            } else {
                this.globalFetch()
            }

        }
    }
    handleFavorite =async (slug)=>{
        await api.post(`/${slug}/favorite`)
        this.state.activeTab==="yourFeed"? this.yourFeed():this.globalFetch()
    }
    handleUnfavorite= async (slug)=>{
        await api.delete(`/${slug}/favorite`)
        this.state.activeTab=== "yourFeed"? this.yourFeed():this.globalFetch()
    }

    render() {
        let { articlesData,offset, tag, articlesCount, error, activeTab, limit } = this.state
        if (error) {
            return (
                <main className="home container">
                    <h1>Loading...</h1>
                    </main>
                )
        }
        return (
            <main className="home container">
                <section className="aritcle-container">
                    <FeedNav  activeTab={ activeTab} {...this.props} handleActiveTab={this.handleActiveTab} tag={tag} />
                    {articlesData ? <>
                        <ArticleList handleFavorite={this.handleFavorite} handleUnfavorite={this.handleUnfavorite} articles={articlesData} />
                        <Pagination limit={limit} activeoffset={offset/10} offset={this.handleOffsetBtn} articlesCount={articlesCount} />
                    </> : ""
                    }
                </section>
                <Aside addTag={this.handleTags} />
            </main>
        )
    }
}