import React, { Component } from "react";
import Article from "./article";
import Offset from "./offset";
import Aside from "./aside"
import axios from "axios"

export default class ArticleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articlesData: null,
            limit: 10,
            Offset:0
        }
    }
    //Handle Offset Button
    handleOffset = () => {
        let btn = []
        let count = this.state.articlesData ? this.state.articlesData.data.articlesCount : 20
        count = Math.floor(count / this.state.limit)

        for (let i = 0; i <= count; i++) {
            btn.push(i)
        }
        return btn
    }


    //Handle Offset button Click
    handleOffsetBtn = (num) => {
        num = this.state.limit * num
        axios.get(`https://mighty-oasis-08080.herokuapp.com/api/articles/?limit=${this.state.limit}&offset=${num}`)
            .then(res => {
                this.setState({
                    articlesData: res
                })
            })
            .catch(err => console.log(err))
    }

    //handleTag
    handleTags=(tag)=>{
        axios.get(`https://mighty-oasis-08080.herokuapp.com/api/articles/?limit=${this.state.limit}&tag=${tag}`)
        .then(res => {
            this.setState({
                articlesData: res
            })
        })
        .catch(err => console.log(err))
    }
    //ComponentDidMount
    componentDidMount() {
        axios.get(`https://mighty-oasis-08080.herokuapp.com/api/articles/?limit=${this.state.limit}`)
            .then(res => {
                this.setState({
                    articlesData: res
                })
            })
            .catch(err => console.log(err))
    }


    //ComponentDidUpdate
    // componentDidUpdate(prevProps,prevState,snapshot){

    //     if(prevState.articlesData===this.state.articlesData){
    //     axios.get(`https://mighty-oasis-08080.herokuapp.com/api/articles/?limit=${this.state.limit}`)
    //     .then(res => {
    //         this.setState({
    //             articlesData: res
    //         })
    //     })
    //     .catch(err => console.log(err))
    // }
    // }

    render() {
        let { articlesData } = this.state
        return (
            <React.Fragment>
                <section>

                    {
                        (articlesData ? articlesData.data.articles : []).map((elm) => {

                            return (
                                <Article key={elm.slug} {...elm} />
                            )
                        })
                    }
                    <ul>{
                        this.handleOffset().map(num => <Offset handleClick={() => this.handleOffsetBtn(num)} num={num} key={num} />)
                    }</ul>
                </section>
                    <Aside handleClick={this.handleTags} />
            </React.Fragment>
        )
    }
}