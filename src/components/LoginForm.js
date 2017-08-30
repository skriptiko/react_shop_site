import React, { Component } from 'react';
import './LoginForm.css';

import * as firebase from 'firebase';




class LoginForm extends Component {
	
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
	
	
	signIn = (e) => {
		e.preventDefault();
		
		let pass = this.state.usernamePass,
			email = this.state.usernameValue,
			auth = firebase.auth(),
			promise = auth.signInWithEmailAndPassword(email, pass);
			
			promise.catch(e => {
				
			});
		
			 
		
			
			
		this.setState({
			usernamePass: "",
			usernameValue: ""
			});
			
	}
	
	

	componentDidMount() {
		
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
			  
			 this.props.updateStatus( false );
		  }
		  else {
			 this.props.updateStatus( true );
		  }
		}.bind(this));
		
	}

	
	
	
  render() {
	 
	  
    return ( <div className="login">
        
					 <div className="login-wrapper">
						<form className="login-form">

						  <div className="username">
							<label><span className="entypo-user"></span></label>
							<input type="text"  value={ this.state.usernameValue } onChange={ this.usernameValueChange } />
						  </div>

						  <div className="password">
							<label><span className="entypo-lock"></span></label>
							<input type="password" value={ this.state.usernamePass } onChange={ this.usernamePassChange }/>
						  </div>

						  <button className="btn" onClick={ this.signIn } >Sign in</button>
						  <p>
							  <a href="#" className="link" >Sign up now <span className="entypo-right-thin"></span></a>
						  </p>

						</form>
					  </div>

				</div>
    );
  }
}

export default LoginForm;