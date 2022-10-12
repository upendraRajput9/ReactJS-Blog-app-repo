import React, { Component } from "react";
import axios from "axios";

export default class Aside extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: []
        }
    }
    componentDidMount() {
        axios.get(`https://mighty-oasis-08080.herokuapp.com/api/tags`)
            .then(res => {
                this.setState({
                    tags: res.data.tags
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        let {tags} = this.state
        return (
            <section>
                <ul>{
tags.map(tag=><li onClick={()=>this.props.handleClick(tag)} key={tag}>{tag}</li>)
                }</ul>
            </section>
        )
    }
}