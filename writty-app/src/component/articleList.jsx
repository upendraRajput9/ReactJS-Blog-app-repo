import React from "react";
import Article from "./article";

export default class ArticleList extends React.Component{
state={
    articleList:null
}
    render(){
        let {articles} = this.props
return(<>
{
    articles.map(article=><Article key={article.slug} {...article}/>)
}
</>
)
    }
}