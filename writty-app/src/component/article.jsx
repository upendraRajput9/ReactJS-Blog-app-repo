import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Article extends Component {
    render() {
        let elm = this.props
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
        let date = new Date(elm.createdAt)
        return (
            <article>
                <header>
                    <div>
                        <figure>
                            <img src={elm.author.image} alt="author" />
                        </figure>
                        <div>
                            <h3>{elm.author.username}</h3>
                            <time>{dl[date.getDay()].slice(0, 3)} {ml[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</time>
                        </div>
                    </div>
                </header>
                <Link to={`/article/${elm.slug}`}>
                    <h2>{elm.title}</h2>
                    </Link>
            </article>
        )
    }
}