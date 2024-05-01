const initialState = {
    isLoading: false,
    error: null, //after clicking login button
    user: null,
    isAuthenticated:false
  };

  export const LOGIN_REQUEST = 'LOGIN_REQUEST';
  export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  export const LOGIN_FAILURE = 'LOGIN_FAILURE';
  export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        console.log("login request action is called",state)
        return {
          ...state,
          isLoading: true,
          error: null,
          isAuthenticated:false
        };
      case LOGIN_SUCCESS:
        console.log("login success action is called",state)
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          isAuthenticated:true
        };
      case LOGIN_FAILURE:
        console.log("login failure action is called",state)
        console.log(action.payload)
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          isAuthenticated:false
        };
      case SET_AUTHENTICATED:
        return {
          ...state,
          isAuthenticated: action.isAuthenticated
        }
      default:
        return state;
    }
  };
  
  export default authReducer;