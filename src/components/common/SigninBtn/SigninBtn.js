import React from "react";
import './SigninBtn.scss';
import microsoft from '../../../assets/microsoft.svg'
import google from '../../../assets/google.svg'

export default class SigninBtn extends React.Component {
    render() {
        const { children, variant } = this.props;
        const variantClass = variant ? `button--${variant}` : '';
        const variantImage = variant === 'microsoft' ? microsoft : google;

        return (
            <button className={`button ${variantClass}`}>
                <div className="button__container">
                    <span className="button__container__icon">
                        <img src={variantImage} alt="" width='24px' height='24' />
                    </span>
                    <span className="button__container__text">{children}</span>
                </div>
            </button>
        )
    }
}