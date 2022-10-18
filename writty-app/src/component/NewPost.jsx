import React from "react";

const NewPost = ()=>{
    return(
        <form>
            <input type="text" placeholder="Article tiltle.."/>
            <input type="text" placeholder="What's this Article About?"/>
            <textarea type='text' placeholder="Write your article(in markdown)"/>
            <input type="text" placeholder="Enter tags"/>
        </form>
    )
}
export default NewPost