import React from "react";
import './button.scss';

export default class Button extends React.Component {
    render() {
        const { children, variant } = this.props;
        const variantClass = variant ? `button--${variant}` : '';
        return (
            <button className={`button ${variantClass}`}>
                <span className="button__text">{children}</span>
            </button>
        )
    }
}