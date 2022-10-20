import axios from "axios";
import { ROOT_URL,articlesURL } from "./utilits/constant";
import { Component } from "react";


export default class Profile extends Component{
state={
    
}
    componentDidMount(){
axios.get(articlesURL)
    }
    render(){
        return(
            <>
<article>
    <div>
        
    </div>
</article>
            </>
        )
    }
}