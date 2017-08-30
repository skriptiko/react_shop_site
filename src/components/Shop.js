import React, { Component } from 'react';
import './Shop.css';
import * as firebase from 'firebase';



class Shop extends Component {
	
	constructor() {
	super();
		this.state = { 
			search: false,
			singleProductView: false,
			cardProductView: false,
			searchString: '',
			linkString: '',
			singleProduct: {},
			productBy: [],
			items: [],
			totalPrCost: 0
		}
				
	}
	
	componentDidMount() {
		let arr = [],
			obj,
			rootRef = firebase.database().ref().child('items');

		rootRef.on('value', snap => {
			
			if(snap.val() == null) {
				this.setState({
					items: []
				});
				return;
			}
				
			obj = snap.val();
			arr = [];
			for (let val in obj) {
				arr.push(obj[val]);
			}

			this.setState({
				items: arr
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

		let arr = this.state.items,
			singleProd;

		for (let i = 0; i < arr.length; i++) {
			if(arr[i].id === id) {
				singleProd = arr[i];
			}
		}
		
		this.setState({
				singleProduct: singleProd,
				singleProductView: !this.state.singleProductView
			}); 
    }
    
    cardProductContainer = (e) => {
		e.preventDefault();
		
		this.setState({
			cardProductView: !this.state.cardProductView
		}); 
    }
	
	addToCard = (e, id) => {

		e.stopPropagation();
		e.preventDefault();
		
		let idfey = this.state.productBy.length,
			arrobj = this.state.items,
			newCardObj,
			cardObj;

		for (let i = 0; i < arrobj.length; i++) {
			if(arrobj[i].id === id) {
				cardObj = arrobj[i];
				newCardObj = Object.assign({}, cardObj);
			}
		}
		
		newCardObj.id = idfey;
		
		if(idfey === 0) {
			this.state.productBy.push(newCardObj);

		} else {
			
			let f = this.state.productBy.filter(par =>  par.title === newCardObj.title);
			
			if(f[0]) {
				let k = f[0].id;
				this.state.productBy[k].sum = this.state.productBy[k].sum + 1;
			};
			if(!f[0]) this.state.productBy.push(newCardObj);

		};
		
		this.totalCost();
		
		this.setState({
				productBy: this.state.productBy
			}); 
		
    }
	
	delFromCard = (i, e) => {
		e.stopPropagation();
		e.preventDefault();
		
		let cardObj = this.state.productBy[i];

		if(cardObj.sum === 1) { this.state.productBy.splice(i, 1) };
		if(cardObj.sum > 1) { cardObj.sum = cardObj.sum - 1 };
		
		this.totalCost();
		
		this.setState({
				productBy: this.state.productBy
			}); 
	}
	
	singleProduct = (e) => {
		e.stopPropagation();
		e.preventDefault();
		
		
	}
	
	totalCost = () => {
	
		let total = 0;
		
		this.state.productBy.forEach(p => {
			
			total = total + (p.price * p.sum);
			
		});
		
		this.state.totalPrCost = total;
		
		this.setState({
				totalPrCost: this.state.totalPrCost
			}); 
		
	}
	
	
	
  render() {
   
	  let libraries = this.state.items,
		  searchString = this.state.searchString.trim().toLowerCase(),
		  shopping = this.state.productBy;
	
	 
   
	  if(searchString.length > 0) {

		  libraries = libraries.filter(function(l){
				
			  return l.title.toLowerCase().match( searchString );
				
			});

     	}
     	
	  
	const inputStyleActive = {
	  		width: "100%"
		};
			
	const productBoxActive = {
	  		width: "0px"
		};
		
	const inputActive = {
	  	padding: "0"
	};
  
  	const productBoxNone = {
	  	opacity: "0"
	};
	  
	const singleProductCss = {
		  		transform: "translateX(0)"
		
		};
			
	const cardProductCss = {
		  transform: "translateX(0)"
		
		};
	  
	  let 	$body = document.querySelector("body"),
		  	$nav = document.querySelector(".nav");
	  
	  $body.style.overflowY = this.state.singleProductView ? "hidden" : "scroll";
	  $body.style.paddingRight = this.state.singleProductView ? "17px" : "0";
//	  $nav.style.paddingRight = this.state.singleProductView ? "17px" : "5px";
		
	  
	  
	  
	  const styleOff = {
	
			};

   
    return (
	<div className="shop">
		
		<div  className="card-product-container" style={this.state.cardProductView ? cardProductCss : styleOff} >

				<div className="card-product-box">
						{shopping.map(function(qa, i) { 
								
								return <div className="card-product" key={i}>
											<img src={qa.url} className="product-in-img" alt=""/>
											<div>
												<p className="card-product-title">{ qa.title }</p>
												<p className="card-product-price">{ qa.price * qa.sum } $</p>
												<p className="card-product-sum">{ qa.sum } {qa.sum === 1 ? "bottle" : "bottles"}</p>
											</div>
											
											<a className="card-product-off" href="/"  onClick={this.delFromCard.bind(this, i)}><i className="fa fa-times" aria-hidden="true"></i></a>
										</div>
						}, this)}
					
						<div className="card-product-buy">
							<p>Total cost: {this.state.totalPrCost} $</p>
							<a href="/" onClick={(e) => this.singleProduct(e)}>Сheckout</a>
						</div>
						<a className="card-product-off" href="/"  onClick={(e) => this.cardProductContainer(e)}><i className="fa fa-times" aria-hidden="true"></i></a>
				</div>

		</div>
		
		<div className="single-product-container" style={this.state.singleProductView ? singleProductCss : styleOff} >
		
					<div className="single-product-c" key={this.state.singleProduct.id} >
						<div className="single-product" onClick={(e) => this.singleProduct(e)}> 
							<div className="single-product-img"> 
								<img src={this.state.singleProduct.url} alt=""/>
							</div>
						
							<div className="single-product-content">
								<h3>{this.state.singleProduct.title}</h3>
								<p className="product-price">{this.state.singleProduct.description}</p>
								<p className="product-price">{this.state.singleProduct.price} $</p>
								<a className="product-btn shop-flex"  onClick={(e) => this.addToCard(e, this.state.singleProduct.id)} href="/">
									<i className="fa fa-shopping-cart"></i>
									<p className="action-text">Add to cart</p>
								</a>
							</div>
							<a  className="single-product-in-off" onClick={(e) => this.singleProductContainer(e, this.state.singleProduct.id)} href="/">
								<i className="fa fa-times" aria-hidden="true"></i>
							</a>
		
						</div>
					</div>			
			</div>
		
			<div className="compare-basket shop-flex">
				
					
					<div className="product-in-box shop-flex" style={this.state.search ? productBoxActive : styleOff}>

						{shopping.map(function(qa, i) { 

									return <div className="product-in shop-flex"  style={this.state.search ? productBoxNone : styleOff} key={i}>
												<img src={qa.url} className="product-in-img" alt=""/>
												<a className="product-in-off" href="/"  onClick={this.delFromCard.bind(this, i)}>
													<i className="fa fa-times" aria-hidden="true"></i>
												</a>
												<p>{ qa.sum === 1 ? "" : qa.sum }</p>
											</div>
					}, this)}

			</div>
				
				
				

				<div className="basket-icon shop-flex">
					<div className="shop-btn" onClick={(e) => this.cardProductContainer(e)}></div>
					<div className="search-btn" onClick={this.searchActive}></div>
				</div>
				<div className="input-container" style={this.state.search ? inputStyleActive : styleOff}>
					<input 
						className="search-input" 
						style={this.state.search ? styleOff : inputActive}
						type="text" 
						value={this.state.searchString} 
						onChange={this.handleChange} />
				</div>
	
			</div>
			<div className="product-container">
			
				{libraries.map(function(item) { 
					return <div className="product" key={item.id} onClick={(e) => this.singleProductContainer(e, item.id)}>
								<div className="product-img"> 
									<img src={item.url} alt=""/>
								</div>
								<h3>{item.title}</h3>
								<p className="product-price">{item.price} $</p>
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