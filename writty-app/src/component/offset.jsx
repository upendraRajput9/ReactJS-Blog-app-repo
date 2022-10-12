import React,{Component} from "react";

export default class Offset extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
            <div onClick={this.props.handleClick}>{this.props.num+1}</div>
            </>
        )
    }
}