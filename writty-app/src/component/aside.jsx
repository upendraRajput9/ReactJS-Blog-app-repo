import React, { Component } from "react";
import { ROOT_URL } from "./utilits/constant";
import axios from "axios";

export default class Aside extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: []
        }
    }
    componentDidMount() {
        axios.get(ROOT_URL + `/api/tags`)
            .then(res => {
                this.setState({
                    tags: res.data.tags
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        let { tags,error } = this.state
        if (error) {
            return <p>{error}</p>
        }
        return (
            <section>
               
                <ul>{
                    tags.map(tag => <li onClick={() => this.props.addTag(tag)} key={tag}>{tag}</li>)
                }</ul>
            </section>
        )
    }
}