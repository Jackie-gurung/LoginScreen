import React, { Component } from 'react'
import './Error.scss'

export default class ErrorMSgBlock extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { message } = this.props;
        return (
            <div className="errorMsgBlock">
                <span>{message}</span>
            </div>
        )
    }
}

