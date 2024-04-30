import { LOGIN_REQUEST,LOGIN_SUCCESS, LOGIN_FAILURE ,LOGIN_DETAILS} from './reducer/authReducer'
import axios from 'axios';
import { createLogic } from 'redux-logic';

import { loginRequest,loginSuccess, loginFailure,getLoginData } from './action/authAction';

const loginUser = createLogic({
    type: LOGIN_REQUEST,
    latest: true,
    process({ action }, dispatch, done) {
        console.log(action.payload)
      
          return axios({
            method:'post',
            url:'/api/v1/eevee/validate/login/?type=email',
            data: action.payload,
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json'
            },
            withCredentials: true
          }).then((validateResponse) => {
            console.log("validate->",validateResponse)
            return axios({
              method:'post',
              url:'/api/v1/eevee/login/?type=email',
              data: action.payload,
              headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
              },
              withCredentials: true
            })
          }).then((loginResponse) => {
              console.log("login",loginResponse)
              console.log(loginResponse.data.data.user)
              // localStorage.setItem('authToken',loginResponse.data.data.token)
              localStorage.setItem('user',JSON.stringify(loginResponse.data.data))
              dispatch(loginSuccess(loginResponse.data.data.user));
          }).catch((error) => {
            dispatch(loginFailure(error.message));
            done()
          })        
    }
})

export default [
  loginUser
];
