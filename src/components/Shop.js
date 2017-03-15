import React, { Component } from 'react';
import './Shop.css';
import * as firebase from 'firebase';
import { Image, FormControl } from 'react-bootstrap';


class Shop extends Component {
	
	constructor() {
	super();
		this.state = { 
			search: true,
			singleProductView: false,
			searchString: '',
			linkString: '',
			singleProduct: {},
			productBy: [],
			items: []
		}
				
	}
	
	componentDidMount() {
			const rootRef = firebase.database().ref().child('items');

			rootRef.on('value', snap => {
				this.setState({
					items: snap.val()
				});
			});
	}
	
	 searchActive = () => {
 		this.setState( { search : !this.state.search } );
 	}
	 
	handleChange = (e) => {
		this.setState({
			searchString: e.target.value
		});
    }
	
	singleProductContainer = (e, id) => {
		e.preventDefault();
		
		this.setState({
				singleProduct: this.state.items[id],
				singleProductView: !this.state.singleProductView
			}); 
    }
	
	addToCard = (e, id) => {
		e.stopPropagation();
		e.preventDefault();
		
		this.state.productBy.push(this.state.items[id]);
	
		this.setState({
				productBy: this.state.productBy
			}); 
		
    }
	
	singleProduct = (e) => {
		e.stopPropagation();
		e.preventDefault();
		
		
	}
	
	
  render() {
   
	  let libraries = this.state.items,
		  searchString = this.state.searchString.trim().toLowerCase(),
		  productInCard = this.state.productBy;
	  console.log(productInCard);
	 
   
	  if(searchString.length > 0) {

		  libraries = libraries.filter(function(l){
				
			  return l.title.toLowerCase().match( searchString );
				
			});

     	}
	  
	  const inputStyleActive = {
			  	height: '1px',
		  		backgroundColor: '#2A2B30'
			};
	  
	  const singleProductCss = {
			  	left: "0"
			};
	  
	  let $body = document.querySelector("body"),
		  	$nav = document.querySelector(".nav");
	  
	  $body.style.overflowY = this.state.singleProductView ? "hidden" : "scroll";
	  $body.style.paddingRight = this.state.singleProductView ? "17px" : "0";
//	  $nav.style.paddingRight = this.state.singleProductView ? "17px" : "5px";
		
	
	 
	  
	   
	  
	  const styleOff = {
	
			};
  
   
    return (
	<div className="shop">
			<div className="compare-basket shop-flex">
				<div className="product-in-box shop-flex">
		
					{productInCard.map(function(i) { 
								return <div className="product-in shop-flex" key={i.id}>
											<div className="product-in-img"> </div>
											<a className="product-in-off" href="/"><i className="fa fa-times" aria-hidden="true"></i></a>
										</div>
					}, this)}

				</div>

				<div className="basket-icon shop-flex">
					<div className="shop-btn"></div>
					<div className="search-btn" onClick={this.searchActive}></div>
				</div>
			</div>
			<div className="input-container">
				<input 
					className="search-input" 
					style={this.state.search ? inputStyleActive : styleOff} 
					type="text" 
					value={this.state.searchString} 
					onChange={this.handleChange} />
			</div>
		
			<div className="single-product-container" 
				 
				 style={this.state.singleProductView ? singleProductCss : styleOff}>
		
				<div className="single-product-bgc"></div>
					<div className="single-product-c" key={this.state.singleProduct.id} onClick={(e) => this.singleProductContainer(e, this.state.singleProduct.id)}>
						<div className="single-product" onClick={(e) => this.singleProduct(e)}> 
							<div className="single-product-img"> 
								<img src={this.state.singleProduct.url} alt=""/>
							</div>
						
							<div className="single-product-content">
								<h3>{this.state.singleProduct.title}</h3>
								<p className="product-price">{this.state.singleProduct.description}</p>
								<p className="product-price">{this.state.singleProduct.price}</p>
								<a className="product-btn shop-flex"  onClick={(e) => this.singleProduct(e)} href="/"><i className="fa fa-shopping-cart"></i><p className="action-text">Add to cart</p></a>
							</div>
							<a  className="single-product-in-off" onClick={(e) => this.singleProductContainer(e, this.state.singleProduct.id)} href="/">
									<i className="fa fa-times" aria-hidden="true"></i>
							</a>
		
						</div>
					</div>			
			</div>
			<div className="product-container">
			
				{libraries.map(function(item) { 
					return <div className="product" key={item.id} onClick={(e) => this.singleProductContainer(e, item.id)}>
								<div className="product-img"> 
									<img src={item.url} alt=""/>
								</div>
								<h3>{item.title}</h3>
								<p className="product-price">{item.price}</p>
								<a className="product-btn shop-flex" href="/" onClick={(e) => this.addToCard(e, item.id)}>		 
									<i className="fa fa-shopping-cart"></i>
									<p className="action-text">Add to cart</p>
								</a>
							</div>
				}, this)}
				
			</div>


	</div>
    );
  }
}

export default Shop;