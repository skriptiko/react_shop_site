import React, { Component } from 'react';
import './Admin.css';
import LoginForm from './LoginForm';
import AdminPanel from './AdminPanel';


class Admin extends Component {
	
	constructor() {
		super();
			this.state = { 
				loggedIn: true,
				usernameValue: "",
				usernamePass: ""
			}
				
	}
	
	usernameValueChange = (e) => {
   
		this.setState({
			usernameValue: e.target.value
			});
			
    
  	}
  	
  	usernamePassChange = (e) => {
   
		this.setState({
			usernamePass: e.target.value
			});
			
    
  	}
	

	
	changeValue = (value)  => {
		console.log(value);
		this.setState({
			loggedIn: value
			});
	}
	
	changeValueOut = (value) => {
		
		this.setState({
			loggedIn: value
			});
	}
	
	


	
	
	
  render() {
	  

	  
    return ( <div className="admin">
    	
				 { this.state.loggedIn ?

				 	<LoginForm updateStatus={this.changeValue} />

				 :

				  	<AdminPanel updateOut={this.changeValue} />

				}
    	
    		</div>
    	 );
  }
}

export default Admin;