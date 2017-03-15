import React, { Component } from 'react';
import './Home.css';


class Home extends Component {
	
	
	
	
  render() {
    return (
      <div className="home-container flex-center">
      
		<div className="home"></div>
		<div className="stars-container flex-center"> 
			<div className="stars"></div>
			<div className="sun"></div>
			<div className="moon"></div>
		</div>
		
 
      </div>
    );
  }
}

export default Home;