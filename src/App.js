// import './App.css';
import React from 'react';
import { 
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import ProtectedRoute from './route/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null, //after clicking login button
            // user: null,
            user: this.getUser(),
            isAuthenticated:false
        }
    };

    getUser(){
        let user = localStorage.getItem('user')
        let person
        if(user){
          user = JSON.parse(user)
          person = user.user
        }else {
          person = null
        }
        console.log("getUSer")
        return person
      }

    componentDidMount(){
        // const authToken = localStorage.getItem('authToken');
        let user = localStorage.getItem('user');
        let authToken
        if(user){
            user = JSON.parse(user)
            authToken = user.token
        }
        console.log("authtoken ",authToken)
        if(authToken){
            this.props.setAuthenticated(true)
        //   this.setState({isAuthenticated:true})
          // this.props.state
          console.log(this.state)
        }
      }

  render() {
    const {isAuthenticated} = this.props
    const {user} = this.state
    console.log(user)

     
    // {isAuthenticated && <Navigate to="/dashboard" replace/>}

    return (
        <Router>
            <Routes>
                <Route path="/login/" element={<Login/>}/>
                <Route path="/" element={<Navigate to="/login/" replace/>}/>
                {user ? (
                    //  <Route element={<Navigate to="/dashboard" replace/>}/>
                     <Route exact path="/dashboard/" element={
                        <ProtectedRoute><Dashboard/></ProtectedRoute>
                    }/>
                    ):(
                    <Route path="/" element={<Navigate to="/login/" replace/>}/>

                )}
                {/* {isAuthenticated && <Route path="/dashboard" element={<Navigate to="/dashboard/"/>}/>} */}
                {/* {isAuthenticated && <Route element={<Navigate to="/dashboard" replace/>}/>} */}
                {/* {isAuthenticated && <Route path="/dashboard/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>} */}
                <Route exact path="/dashboard/" element={
                    <ProtectedRoute><Dashboard/></ProtectedRoute>
                }/>
            </Routes>
        </Router>
        
      
    );
  }
}

const mapStateToProps = (state) => {
    console.log("current state from  maptpprops",state)
    return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
}}

const mapDispatchToProps = (dispatch) => ({
    setAuthenticated: (isAuthenticated) => dispatch({ type: 'SET_AUTHENTICATED', isAuthenticated })
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);

