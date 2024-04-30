import React, { Component } from "react";
import { connect } from "react-redux";
import { 
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';

class Dashboard extends Component {

  getUser(){
    let user = localStorage.getItem('user')
    let person
    if(user){
      user = JSON.parse(user)
      person = user.user
    }else {
      // throw new Error("User data not found")
      person = null
      // <Navigate to='/login/'/>
    }
    console.log("getUSer")
    return person
  }

  render() {
    const { user } = this.props;
    console.log("from Dashboard",user)

    let { full_name } = user || {};

    // if(!full_name){
    //   let person = this.getUser()
    //   full_name = person.full_name
    //   console.log(full_name)
    // }

    if(!full_name){
      console.log("full not found")
      try {
        let person = this.getUser()
        full_name = person.full_name
        console.log(full_name)
      } catch (error){
        // console.log("name not foun")
        return <Navigate to='/login/'/>
      }
     
    }

    return (
      <div>
        Welcome to Docsumo {full_name}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
