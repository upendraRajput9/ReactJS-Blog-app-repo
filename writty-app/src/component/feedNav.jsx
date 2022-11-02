import React from "react";

const FeedNav = (props) => {
    let { handleActiveTab } = props

    if (props.handleArticle) {
        return (
            <nav className="feedNav">
                <ul>
                <li className={props.activeTab==="author"?"feed-active":""} onClick={() => props.handleArticle("author")}>My Article</li>
                <li className={props.activeTab==="favorited"?"feed-active":""} onClick={() => props.handleArticle("favorited")}>Favorited Articles</li>
                </ul>
            </nav>
        )
    }
    return (
        <nav className="feedNav">
            <ul>{
                props.currentUser ? <li className={props.activeTab==="yourFeed"?"feed-active":""} onClick={() => handleActiveTab("yourFeed")}>Your Feed</li> : ""}
                <li className={props.activeTab==="GlobalFeed"?"feed-active":""} onClick={() => handleActiveTab("GlobalFeed")} >Global Feed </li>

                {props.tag ? <li className="feed-active">#{props.tag}</li> : ""}
            </ul>
        </nav>
    )
}
export default FeedNav