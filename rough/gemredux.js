// action 
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = (credentials) => ({
    type: LOGIN_REQUEST,
    payload: credentials,
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

// reducer 
const initialState = {
    isLoading: false,
    error: null,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;


//   login 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../redux/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        this.props.dispatch(loginRequest({ username, password }));
    };

    render() {
        const { isLoading, error } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    error: state.auth.error,
});

export default connect(mapStateToProps)(Login);


//logic code  

import axios from 'axios';

export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest(credentials));
    try {
      // Validate email and password (1st API call)
      const validateResponse = await axios.post(
        'https://apptesting.docsumo.com/api/v1/eevee/validate/login/',
        { type: "email" },
        { params: credentials }
      );

      // Extract token from Set-Cookie header
      const token = extractTokenFromCookie(validateResponse.headers['set-cookie']);

      // Login with token (2nd API call)
      const loginResponse = await axios.post(
        'https://apptesting.docsumo.com/api/v1/eevee/login/',
        credentials,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(loginSuccess(loginResponse.data));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

// Function to extract token from Set-Cookie header (implement based on your backend response format)
function extractTokenFromCookie(cookieString) {
  // Implement logic to parse cookieString and extract the token value
  // This is a placeholder, replace with your actual implementation
  const tokenRegex = /token=(.*?);/;
  const match = tokenRegex.exec(cookieString);
  return match ? match[1] : null;
}

// .then((validateResponse) => {
//     console.log(validateResponse)
//   // Extract token from Set-Cookie header
//   const token = extractTokenFromCookie(validateResponse.headers['set-cookie']);

//   // Login with token (2nd API call)
//   return httpClient.post(
//     'https://apptesting.docsumo.com/api/v1/eevee/login/',
//     action.payload,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
// })
// .then((loginResponse) => {
//   dispatch(loginSuccess(loginResponse.data));
//   done();
// })
// .catch((error) => {
//   dispatch(loginFailure(error.message));
//   done();
// });
  

// @ts-check


  // @ts-nocheck
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  import React from "react";
  import Login from "./components/Login";
  import ProtectedRoute from "./route/ProtectedRoute"; //? to do:
  import Dashboard from "./components/Dashboard";
  
  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login/" replace />} />
          <Route path="/login/" element={<Login />} />
          <Route
            exact
            path="/dashboard/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    );
  }
  
  export default App;

  import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userAuth);

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;