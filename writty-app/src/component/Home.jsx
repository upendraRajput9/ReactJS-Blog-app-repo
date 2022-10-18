import React, { Component } from "react";
import ArticleList from "./articleList";
import { articlesURL } from "./utilits/constant"
import Pagination from "./Pagination";
import Aside from "./aside"
import FeedNav from "./feedNav";
import axios from "axios"


export default class Home extends Component {

    state = {
        articlesData: null,
        limit: 10,
        offset: 0,
        error: "",
        tag: null,
        author: null,
        favorited: null,
        activeTab: null
    }


    //Tag
    //addTag
    addTag = (tag) => {
        this.setState({ activeTab: tag,
        offset:0
        })
    }
    //Remove tag
    removeTag = () => {
        this.setState({ activeTab: null, offset:0 })
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
            tag: tag
        })
    }

    fetch = () => {
        let { limit, offset ,activeTab} = this.state
        axios.get(articlesURL + `/?limit=${limit}&offset=${offset}&${activeTab?`tag=${activeTab}`:''}`)
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
        this.fetch()
    }

    //component Did Update
    componentDidUpdate(prevProps, prevState) {
        if (prevState.offset !== this.state.offset||prevState.activeTab !== this.state.activeTab) {
            this.fetch()
        }
    }



    render() {
        let { articlesData, articlesCount, error,activeTab, limit } = this.state
        if (error) {
            return <p>{error}</p>
        }
        return (
            <React.Fragment>
                <FeedNav removeTag={()=>this.removeTag()} activeTab={activeTab} />
                {articlesData ? <>
                    <ArticleList articles={articlesData}  />
                    <Pagination limit={limit} offset={this.handleOffsetBtn} articlesCount={articlesCount} />
                </> : ""
                }
                <Aside addTag={this.addTag} />
            </React.Fragment>
        )
    }
}