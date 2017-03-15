import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Product from './components/Product';
import Contact from './components/Contact';
import Shop from './components/Shop';
import Home from './components/Home';
import Recipes from './components/Recipes';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA93SYFGFmbFctj9t44jHtZbjKrRdYB9Po",
    authDomain: "react-test-c5eee.firebaseapp.com",
    databaseURL: "https://react-test-c5eee.firebaseio.com",
    storageBucket: "react-test-c5eee.appspot.com",
    messagingSenderId: "632288703136"
  };

firebase.initializeApp(config);

ReactDOM.render((
  <Router history={browserHistory}>
	
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
      	<Route path="/product" component={Product}/>
      	<Route path="/shop" component={Shop}/>
		<Route path="/recipes" component={Recipes}/>
		<Route path="/contact" component={Contact}/>
    </Route>
	
  </Router>
), document.getElementById('root'))
