import React from 'react';
import uuid from 'uuid';

const NewProduct = React.createClass({
  getInitialState(){
    return{
      name:'',
      price: 0,
      description: ''
    }
  },
  addProdInfos(){
    let name = this.state.name;
    let price = this.state.price;
    let description = this.state.description;
    this.props.addProd(name, price, description);
    this.setState({name:'', price: 0 , description: ''});
  },
  onInputNameChange(event){
    this.setState({name: event.target.value})
  },
  onInputPriceChange(event){
    this.setState({price: event.target.value})
  },
  onInputChange(event){
    this.setState({description: event.target.value})
  },
  render(){
    return (
      <div>
        <h1>Store Product Organizer</h1>
        <h4>Total Products is {this.props.totalProds}, Total Value is {this.props.totalPrice}.</h4>
        <div>
          <span>Produce Name: </span><input type="text" id="inputText" value={this.state.name} onChange={this.onInputNameChange}/>
          <span>Produce Price: </span><input type="text" id="inputText" value={this.state.Price} onChange={this.onInputPriceChange}/>
          <span>Produce description: </span><input type="text" id="inputText" value={this.state.description} onChange={this.onInputChange}/>
          <button className='btn btn-primary' onClick={this.addProdInfos}>Add Product</button>
        </div>
      </div>
    )
  }
})

const Product = React.createClass({
  render(){
    return(
    <tr key={this.props.id}>
      <td>{this.props.name}</td>
      <td>{this.props.price}</td>
      <td>{this.props.description}</td>
      <td><button className='btn btn-danger' onClick={()=>this.props.removeProd(this.props.id)}>Delete</button></td>
      <td><button type="button" className="btn btn-success">Edit</button></td>
    </tr>)
  }
})

const ProdList = React.createClass({
  render(){
    let products = this.props.storeProds.map(product=>{
      return <Product key={product.id} name={product.name} id={product.id} price ={product.price} description = {product.description} removeProd={this.props.removeProd}/>
    });
    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th onClick={this.props.prodSortByName} onDoubleClick={this.props.prodSortByName_ascending}>Name</th>
            <th onClick={this.props.prodSortByPrice} onDoubleClick={this.props.prodSortByPrice_ascending}>Price</th>
            <th>description</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products}
        </tbody>
      </table>
    )
  }
})

const StoreBoard = React.createClass({
  getInitialState(){
    try{
      var storeProds = JSON.parse(localStorage.storeProds)
    }catch(err){
      var storeProds =[];
    }
    return {
      storeProds
    };
  },
  componentDidUpdate(){
    localStorage.storeProds = JSON.stringify(this.state.storeProds);
  },
  addProd(name, price, description){
    let product = {};
    product.name = name;
    product.id = uuid();
    product.price = price;
    product.description = description;
    this.setState({ storeProds: this.state.storeProds.concat(product) })
  },
  removeProd: function(id){
    this.setState({storeProds: this.state.storeProds.filter(s => s.id !== id)
    });
  },
  prodSortByName(){
    let productArr = this.state.storeProds;
    let newProdArr = productArr.sort((a,b)=>{
      return (a.name > b.name)? 1 : ((b.name > a.name)? -1 : 0);
    });
    this.setState({storeProds: newProdArr});
  },
  prodSortByPrice(){
    let productArr = this.state.storeProds;
    let newProdArr = productArr.sort((a,b)=>{
      return (a.price - b.price);
    });
    this.setState({storeProds: newProdArr});
  },
  prodSortByName_ascending(){
    let productArr = this.state.storeProds;
    let newProdArr = productArr.sort((a,b)=>{
      return (a.name < b.name)? 1 : ((b.name < a.name)? -1 : 0);
    });
    this.setState({storeProds: newProdArr});
  },
  prodSortByPrice_ascending(){
    let productArr = this.state.storeProds;
    let newProdArr = productArr.sort((a,b)=>{
      return (b.price - a.price);
    });
    this.setState({storeProds: newProdArr});
  },
  totalProds(){
    let productArr = this.state.storeProds;
    let totalProducts = productArr.length;
    return totalProducts;
  },
  totalPrice(){
    let productArr = this.state.storeProds;
    let sum = 0;
    productArr.forEach(product=>{
      return sum += +product.price ;
    });
    return sum;
  },
  render(){
    const totalProds = this.totalProds();
    const totalPrice = this.totalPrice();
    return(
      <div>
        <NewProduct addProd = {this.addProd}  totalProds={totalProds}   totalPrice={totalPrice}/>
        <ProdList storeProds ={this.state.storeProds} removeProd={this.removeProd} prodSortByName={this.prodSortByName} prodSortByPrice={this.prodSortByPrice}
          prodSortByName_ascending = {this.prodSortByName_ascending} prodSortByPrice_ascending={this.prodSortByPrice_ascending}/>
      </div>
    )
  }
})

const AddStoreProds = React.createClass({
  render(){
    return(
      <StoreBoard />
    )
  }
});


export default AddStoreProds;
