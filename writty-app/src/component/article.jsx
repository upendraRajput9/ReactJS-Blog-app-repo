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
                <header className="profile-pic">
                    <figure>
                        <img src={elm.author.image} alt="author" />
                    </figure>
                    <div>
                        <h4 className="underLine"><Link to={`/${elm.author.username}`}>
                            {elm.author.username}
                        </Link></h4>
                        <time>{dl[date.getDay()].slice(0, 3)} {ml[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</time>
                    </div>
                    <button onClick={() => elm.favorited ? this.props.handleUnfavorite(elm.slug) : this.props.handleFavorite(elm.slug)} className={elm.favorited ? "button-89 favoriteOne" : "button-89"} role="button">{elm.favoritesCount} <i className="fa-solid fa-heart"></i></button>
                </header>

                <Link to={`/article/${elm.slug}`}>
                    <h2>{elm.title}</h2>
                    <h3>{elm.description}</h3>
                    <p>Read more...</p>
                </Link>

            </article>
        )
    }
}