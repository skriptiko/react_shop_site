import React, { Component } from 'react';
import './Admin.css';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';


firebase.auth().onAuthStateChanged(user => {
				if(user) {
					if(location.pathname === "/login") {
						browserHistory.push('/admin');
					}	

				} else { 
					
					if(location.pathname === "/admin") {
						browserHistory.push('/login');
					}
					
				}
});

class Admin extends Component {
	
	
	
	
	signOut = (e) => {
	e.preventDefault();
	
		firebase.auth().signOut();
	}
	
	
  render() {
    return (
      <div className="admin">
       	<h1 className="adminH1">AdminPanel</h1>
       	<a href="/" onClick={ (e) => this.signOut(e) }>Sign Out</a>
      </div>
    );
  }
}

export default Admin;