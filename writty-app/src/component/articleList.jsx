import React from "react";
import Article from "./article";

export default class ArticleList extends React.Component {
    state = {
        articleList: null
    }
    render() {
        let { articles } = this.props
        return (<div className="Articles-section">
            {
                articles.map(article => <Article {...this.props} key={article.slug} {...article} />)
            }
        </div>
        )
    }
}