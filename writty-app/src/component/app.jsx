import React,{Component} from "react";
import ArticleList from "./articleList";

export default class APP extends Component{
    constructor(props){
        super(props)
    }

    render(){

        return(
            <>
            <ArticleList/>
            </>
        )
    }
}