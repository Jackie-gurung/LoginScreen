import React, { Component } from 'react'
import { LuEye, LuEyeOff } from "react-icons/lu";
import './LoginCard.scss'

import ErrorMsg from '../common/Error/Error';
// redux 
import { connect } from 'react-redux';
import { loginRequest } from '../../redux/action/authAction';

import { 
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from 'react-router-dom';

//   email: 'frontend@docsumo.com',
//   password: '76tA2RFJFq6vVhyE',

class LoginCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false,
            emailError: '',
            passwordError: '',

            isLoading: false,
            error: null, //after clicking login button
            user: null,
            isAuthenticated:false
        }
    };

    // componentDidUpdate(prevProps,prevState){
    //     console.log("componentdidupdate calleds from logincard")
    //     if (prevState.isAuthenticated !== this.props.isAuthenticated) {
    //     //   console.log("component did mount calleds is checked")
    //       this.context.history.push("/dashboard/");
    //     }
    //   }

    // componentDidMount(){
    //     console.log("component did mount calleds from login")
    //     const authToken = localStorage.getItem('authToken');
    //     console.log("authtoken ",authToken)
    //     if(authToken){
    //       this.setState({isAuthenticated:true})
    //       // this.props.state
    //       console.log(this.state)
    //     }
    //     // if (this.props.isAuthenticated) {
    //     //   console.log("component did mount calleds is checked")
    //     //   // this.props.history.push("/dashboard/");
    //     // }
    //   }


    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const isEmailValid = this.validateEmail(email);
        const isPasswordValid = this.validatePassword(password);

        if (isEmailValid && isPasswordValid) {
            console.log(`submitted ${email} ${password}`);
            this.props.dispatch(loginRequest({email, password}));
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })

    }

    validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.setState({ emailError: 'Please enter a valid email address' })
            return false
        }
        this.setState({ emailError: '' })
        return true
    }

    validatePassword = (password) => {
        if (password.length < 1) {
            this.setState({ passwordError: 'Please enter a password' })
            return false
        }
        // const passwordError = password ? '' : 'Please enter a password';
        this.setState({ passwordError: '' })
        return true
    }

    togglePasswordVisibility = () => {
        console.log("clicked eye")
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }))
    }

    render() {
        const { email, password, emailError, passwordError } = this.state;
        const {isLoading, error, isAuthenticated} = this.props;

        return (
            <div>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="login">
                        <label htmlFor="email">Work Email</label>
                        <div className='login__input'>
                            <input
                                name="email"
                                type="email"
                                className="login__inputfield emailField"
                                placeholder="janedoe@abc.com"
                                autoComplete="off"
                                value={email}
                                onChange={this.handleChange} />
                        </div>
                        {emailError && <ErrorMsg message={emailError} />}
                    </div>

                    <div className="login login--lower">
                        <label htmlFor="password">Password</label>
                        <div className='login__input'>
                            <input
                                name="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                className="login__inputfield passwordField"
                                placeholder="Enter Password Here..."
                                autoComplete="off"
                                value={password}
                                onChange={this.handleChange} />
                            <span onClick={this.togglePasswordVisibility}>
                                {this.state.showPassword ? <LuEye /> : <LuEyeOff />}
                            </span>
                        </div>
                        {passwordError && <ErrorMsg message={passwordError} />}
                    </div>

                    <div className="login__links">
                        <a href="#" className="login__forgot-password">Forgot password?</a>
                    </div>

                    <div className='loginBtn'>
                        <button type="submit" className="loginBtn__button">
                            {isLoading ? 'Logging In' : 'login'}
                            {this.props.isAuthenticated && <Navigate to="/dashboard/" replace/>}
                            {/* Login */}
                        </button>
                    </div>
                </form>

            </div>
        );
    }
}

// export default Login;

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(LoginCard)