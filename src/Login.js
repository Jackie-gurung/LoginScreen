import React from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import './Login.scss'
// redux 
import { connect } from 'react-redux';
//components
import LoginCard from './components/login/LoginCard';
import SigninBtn from './components/common/SigninBtn/SigninBtn';
import ErrorMSgBlock from './components/common/Error/ErrorMSgBlock';
// assets 
import Logo from './assets/docsumo-logo.png'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null, //after clicking login button
      user: null,
      isAuthenticated:false
    }
  };

  // componentDidMount(){
  //   console.log("component did mount calleds from login")
  //   const authToken = localStorage.getItem('authToken');
  //   console.log("authtoken ",authToken)
  //   if(authToken){
  //     this.setState({isAuthenticated:true})
  //     // this.props.state
  //     console.log(this.state)
  //   }
  //   // if (this.props.isAuthenticated) {
  //   //   console.log("component did mount calleds is checked")
  //   //   // this.props.history.push("/dashboard/");
  //   // }
  // }

  render() {
    const { error} = this.props;
    const {setIncrement, setDecrement,count} = this.props

    return (
      <div className='app'>
        <div className='content'>

          <div className='logo'>
            <a href="#" className='logo__link'>
              <img src={Logo} alt="Docsumo" />
            </a>
          </div>

          <div className="Login">
            <div className="Login__container">
              <h2>Login to your Docsumo account</h2>
              {error ? <ErrorMSgBlock message={"User doesn't exist."} /> : ''}
              {/* <ErrorMSgBlock message={error} /> */}

              <div className="social-login">
                <div className="social-login__buttons">
                  <SigninBtn variant="google">Sign in with Google</SigninBtn>
                  <SigninBtn variant="microsoft">Sign in with Microsoft</SigninBtn>
                </div>
              </div>

              <div className='dashline'>
                <h3>OR</h3>
              </div>

              <LoginCard />

              <div className='footer'>
                <div>
                  <a href="#" >Login with SSO</a>
                </div>
                <div>
                  <span className="footer_signup">Don't have an account?</span>
                  <a href="/signup">  Sign up</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default App;

const mapStateToProps = (state) => {
  console.log('State', state)
  return{
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
  }
}

// const mapState = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated
// })

// const mapDispatch = (dispatch) => {
//   return {
//     setIncrement: () => dispatch(setIncrement()),
//     setDecrement: () => dispatch(setDecrement())
//   }
// }

export default connect(mapStateToProps)(Login);
// export default connect(mapState)(Login);

