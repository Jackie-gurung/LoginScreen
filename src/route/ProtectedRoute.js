import React,{Component} from "react";
import { connect } from "react-redux";
import { 
    BrowserRouter as Router,
    Navigate,
} from 'react-router-dom';

class ProtectedRoute extends Component{

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

    render() {
        const {user} =  this.props;
        console.log("protected route called");
        if(user){
            return this.props.children;
        }else if (this.getUser){
            return this.props.children;
        }else{
            return <Navigate to="/login"/>

        }
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    error: state.auth.user
})

export default connect(mapStateToProps)(ProtectedRoute)
