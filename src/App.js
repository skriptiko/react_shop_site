import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';


class App extends Component {
 
constructor() {
	super();
		this.state = { 
			condition: false
		}
				
}

 linkIcon = (e) => {
 	e.preventDefault();
 	
 	this.setState( { condition : !this.state.condition } );
 }
 
 
  render() {
	  
	   const menuActive = {
			  transform: "translateX(0)"
			};
	  
	  const styleOff = {
	
			};
	  
    return (
			<div className="app">
				
				<div role="nav" className="nav">
		
					<a href="/" className={this.state.condition ? "trigger active" : "trigger"} onClick={this.linkIcon}>Menu 
						<span></span>
					</a>
		
					<ul style={this.state.condition ? menuActive : styleOff}>
					  <li><Link to="/">Home</Link></li>
					  
					  <li><Link to="/shop">Shop</Link></li>
					  <li><Link to="/recipes">Admin</Link></li>
					 
					</ul>
					
				</div>

				  {this.props.children}


		  </div>
 
    );
  }
}

export default App;
