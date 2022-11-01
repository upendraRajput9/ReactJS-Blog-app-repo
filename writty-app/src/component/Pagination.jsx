import React, { Component } from "react";

export default class Pagination extends Component {
    state = {
        pageList: []
    }

    componentDidMount() {
        this.handleOffset()
    }
    //Handle Offset Button
    handleOffset = async () => {
        let btn = []
        let count = await this.props.articlesCount ? this.props.articlesCount : 0
        count = Math.ceil(count / this.props.limit)
        for (let i = 0; i < count; i++) {
            btn.push(i)
        }
        this.setState({
            pageList: btn
        })

    }
    componentDidUpdate(prevProps) {
        if (prevProps.articlesCount !== this.props.articlesCount) {
            this.handleOffset()
        }
    }
    render() {
        let { pageList } = this.state
        if (pageList.length < 2) {
            return
        }
        return (
            <ul className="pagination">
                {pageList.map(num =>
                    <li className={this.props.activeoffset===+num?"pgActive":""} key={num} onClick={() => this.props.offset(num)}>{num + 1}</li>
                )
                }
            </ul>
        )
    }
}