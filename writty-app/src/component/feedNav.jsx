import React from "react";
import { Link } from "react-router-dom";

const FeedNav = (props)=>{
return(
    <nav>
        <ul>
            <li onClick={props.removeTag}>
                <Link to="/">
                Global Feed
                </Link>
            </li>{props.activeTab &&(
            <li>
               
              #{props.activeTab}
                
            </li>)}
            <li></li>
        </ul>
    </nav>
)
}
export default FeedNav