import React, { Component } from "react";
import { ROOT_URL } from "./utilits/constant";
import axios from "axios";

const api = axios.create({
    baseURL: ROOT_URL
})

export default class Aside extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: []
        }
    }
    componentDidMount() {
        api.get(`/api/tags`)
            .then(res => {
                this.setState({
                    tags: res.data.tags
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        let { tags, error } = this.state
        if (error) {
            return <p>{error}</p>
        }
        return (
            <section className="aside">
                <ul>{
                    tags.map(tag => <li onClick={() => this.props.addTag(tag)} key={tag}>{tag}</li>)
                }</ul>
            </section>
        )
    }
}