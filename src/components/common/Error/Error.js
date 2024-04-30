import React, { Component } from 'react'
import './Error.scss'

export default class ErrorMsg extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { message } = this.props;
        return (
            <div className="errorMsg">
                <span>{message}</span>
            </div>
        )
    }
}
