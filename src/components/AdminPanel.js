import React, { Component } from 'react';
import './AdminPanel.css';
import Dropzone from 'react-dropzone';
import $ from 'jquery';

import * as firebase from 'firebase';




class AdminPanel extends Component {
	
	constructor() {
	super();
		this.state = { 
			items: [],
			editView: false,
			newTitle: '',
			newPrice: '',
			newDescription: '',
			file: [],
			itemsMax: -1,
			editorSend: true,
			objKey: -1
		}
				
	}
	
	newTitleChange = (e) => {
		
		if(e.target.value.length > 50) {
			return;
		} 
    	this.setState({
    		newTitle: e.target.value
    	});
 
  	}
   	
   	newPriceChange = (e) => {
   		
   		if(isNaN(+e.target.value) || e.target.value.length > 6) {
			return;
		}  
    	this.setState({
    		newPrice: e.target.value
    	});

  	}
	
	newDescriptionChange = (e) => {

		if(e.target.value.length > 300) {
			return;
		}
    	this.setState({
    		newDescription: e.target.value
    	});
 
  	}
	
	
	getMax = () => {
		let parMax = 0,
			arr;
			
		arr = this.state.items;	
		
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].id >= parMax) {
				parMax = arr[i].id + 1;
			}
		}
		console.log(parMax)
		if(arr.length === 0) {
			parMax = 0;
		}

		return parMax;

	}
	
	componentDidMount = () => {
			let arr = [],
				obj;
			const rootRef = firebase.database().ref().child('items');

			rootRef.on('value', snap => {
				console.log("1");
				if(snap.val() == null) {
					this.setState({
						items: []
					});
					return;
				}
				console.log("2");
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

	
	
	signOutFunk = (e) => {
		e.preventDefault();
		
		firebase.auth().signOut().then(function() {
			
			this.props.updateOut( true );
			
		}).catch(function(error) {
		 
		});
	}
	
	newProductView = (e) => {
		e.stopPropagation();
		e.preventDefault();
		
		this.setState({
			editorSend: true,
			editView: !this.state.editView

		}); 
	}
	

	
	onDrop = (file) => {
		
		this.setState({
    		file: file
    	});
		
	}

	clearImg = (e) => {
		e.stopPropagation();
		e.preventDefault();

		this.setState({
    		file: -1
    	});
	}

	delProduct = (e, key) => {
		e.preventDefault();

		let obj;

		for(let i = 0; i < this.state.items.length; i++) {
			if(this.state.items[i].key === key) {
				obj = this.state.items[i];
			}
		}

		firebase.storage().ref().child('img/' + obj.img).delete();
		firebase.database().ref('items/' + key).set(null);
	
	}
	
	
	sendNewProduct = (e) => {
		e.stopPropagation();
		e.preventDefault();

		let data = Date.now(),
			name = data,
			userId = data,
			imgurl = name+".png",
			metadata = {},
			par = this.getMax(),
			mountainImagesRef,
			imgFullUrl,
			newTitle = this.state.newTitle,
			newPrice = this.state.newPrice,
			descrip = this.state.newDescription,
			key,
			link;

		metadata = {
		  contentType: 'image/png',
		};
		//console.log(par)
		firebase.storage().ref().child("img/"+imgurl).put(this.state.file[0], metadata).then(function(snapshot) {
			firebase.storage().ref().child('img/'+imgurl).getDownloadURL().then(function(url) {
			
				imgFullUrl = url;
				link = firebase.database().ref("items/").push();
				key = link.key;
				firebase.database().ref("items/" + key).update({
					key: key,
					id: par,
					title: newTitle,
					sum: 1,
					price: newPrice,
					description: descrip,
					url: imgFullUrl,
					img: imgurl
				 });
			});
		});

    	setTimeout(function() {
    		this.setState({
    			newTitle: "",
    			newPrice: "",
    			newDescription: "",
    			file: -1,
    			editView: !this.state.editView
    		}); 
    	}.bind(this), 500);
	}

	editProd = (e, key) => {

		e.preventDefault();

		this.setState({
    		editorSend: false,
    		editView: !this.state.editView
    	});

    	for (var i = 0; i < this.state.items.length; i++) {
    		if(this.state.items[i].key === key) {
    			this.setState({
    				newTitle: this.state.items[i].title,
    				newPrice: this.state.items[i].price,
    				newDescription: this.state.items[i].description,
    				objKey: key
    			});
    		}
    	}
	}


	updateProduct = (e) => {

		e.preventDefault();

		let data = Date.now(),
			name = data,
			userId = data,
			imgurl = name+".png",
			metadata = {},
			par = this.getMax(),
			mountainImagesRef,
			imgFullUrl,
			newTitle = this.state.newTitle,
			newPrice = this.state.newPrice,
			descrip = this.state.newDescription,
			link,
			key2 = this.state.objKey,
			file = this.state.file;

		if(this.state.file.length !== 0) {
			
			firebase.storage().ref().child("img/"+imgurl).put(file[0], metadata).then(function(snapshot) {
				firebase.storage().ref().child('img/'+imgurl).getDownloadURL().then(function(url) {
				
					imgFullUrl = url;
					
					firebase.database().ref("items/" + key2).update({
						
						title: newTitle,
						sum: 1,
						price: newPrice,
						description: descrip,
						url: imgFullUrl,
						img: imgurl
					 });
				});
			});
		} else  {

			firebase.database().ref("items/" + key2).update({
						
				title: newTitle,
				sum: 1,
				price: newPrice,
				description: descrip
			});
		}

		setTimeout(function() {
    		this.setState({
    			newTitle: "",
    			newPrice: "",
    			newDescription: "",
    			file: -1,
    			editView: !this.state.editView
    		}); 
    	}.bind(this), 500);

		
	}

	changeBtn = () => {
		if(this.state.editorSend === true) {
			return	<div className="new-product-button-cont" onClick={ this.sendNewProduct } >
						<button className="new-product-button">Add product</button>
					</div>
		} else {
			return	<div className="new-product-button-cont" onClick={ this.updateProduct } >
						<button className="new-product-button">Edit product</button>
					</div>
		}
		
	}
	
  render() {

  		let adminItems = this.state.items;

	  	const editProduct = {
		  		transform: "translateX(0)"
		};

		const fileDroped = {
		  		border: "2px dashed rgba(220, 20, 60, .5)"
		};
	
    return ( 
		<div className="admin-panel">
			<div className="new-product-container" style={ this.state.editView ? editProduct : null } >
		
					<div className="new-product-c" >
						<div className="new-product" >
							<div className="input-type">
								<label htmlFor="title">Title: </label>
								<input className="new-product-title" name="title" type="text" value={ this.state.newTitle } onChange={ this.newTitleChange } />
							</div>
							<div className="input-type">
								<label htmlFor="price">Price: </label>
								<input className="new-product-price" name="price" type="text" value={ this.state.newPrice } onChange={ this.newPriceChange } />
								<p>$</p>
							</div>
							<div className="input-type-ta">
								<label htmlFor="description">Description: </label>
								<textarea className="new-product-description" name="description" value={ this.state.newDescription } onChange={ this.newDescriptionChange } >
								</textarea>
							</div>
							
							<Dropzone className="dropzone" onDrop={ this.onDrop } style={ this.state.file.length > 0 ? fileDroped : null }>
								<a className="clear-img" href="/"  onClick={ this.clearImg }>
									<i className="fa fa-times" aria-hidden="true"></i>
								</a>
								 <div>Image must be 347x1037.</div>
							</Dropzone>

							{ this.changeBtn() }
							
							<a className="new-product-in-off" href="/"  onClick={ this.newProductView }>
								<i className="fa fa-times" aria-hidden="true"></i>
							</a>
		
						</div>
					</div>			
			</div>
			<div className="signout">
				<a href="/" className="signout-button" onClick={ this.signOutFunk }>Sign out</a>
			</div>
			<div className="add-product">
				<a href="/" className="add-button" onClick={this.newProductView}>+</a>
			</div>

			<div className="admin-product-container">
			
					{ 	adminItems.map(function(item) { 
						
						return 	<div className="product" key={item.key}>
									<a className="product-del" href="/" onClick={ (e) => this.delProduct(e, item.key) } ><i className="fa fa-times" aria-hidden="true" ></i></a>
									<div className="product-img"> 
										<img src={item.url} alt=""/>
									</div>
									<h3>{item.title}</h3>
									<p className="product-price">{item.price} $</p>
									<a className="product-btn shop-flex" href="/" onClick={ (e) => this.editProd(e, item.key) }> Edit product</a>
								</div>
						}, this)
					}	

			</div>
		</div>
			

    	);
  }
}

export default AdminPanel;