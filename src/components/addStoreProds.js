import React from 'react';
import uuid from 'uuid';


const NewProduct = React.createClass({
  getInitialState(){
    return{
      name:'',
      price: 0,
      quantity: 0
    }
  },
  addProdInfos(){
    let name = this.state.name;
    let price = this.state.price;
    let quantity = this.state.quantity;
    this.props.addProd(name, price, quantity);
    this.setState({name:'', price: 0 , quantity: 0});
  },
  onInputNameChange(event){
    this.setState({name: event.target.value})
  },
  onInputPriceChange(event){
    this.setState({price: event.target.value})
  },
  onInputQuantityChange(event){
    this.setState({quantity: event.target.value})
  },
  render(){
    return (
      <div>
        <h1>Store Product Organizer</h1>
        <div>
          <span>Produce Name: </span><input type="text" id="inputText" value={this.state.name} onChange={this.onInputNameChange}/>
          <span>Produce Price: </span><input type="text" id="inputText" value={this.state.Price} onChange={this.onInputPriceChange}/>
          <span>Produce Quantity: </span><input type="text" id="inputText" value={this.state.quantity} onChange={this.onInputQuantityChange}/>
          <button className='btn btn-primary' onClick={this.addProdInfos}>Add Product</button>
        </div>
      </div>

    )
  }
})

const Product = React.createClass({
  render(){
    return(
    <tr key ={this.props.id}>
      <td>{this.props.name}</td>
      <td>{this.props.price}</td>
      <td>{this.props.quantity}</td>
    </tr>)
    // return (<li key={this.props.id}>{this.props.name}</li>)
  }
})

const ProdList = React.createClass({
  render(){
    let products = this.props.storeProds.map(product=>{
      return <Product key={product.id} name={product.name} id={product.id} price ={product.price} quantity = {product.quantity}/>
    });
    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
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
    return {storeProds};
  },
  componentDidUpdate(){
    localStorage.storeProds = JSON.stringify(this.state.storeProds);
  },
  addProd(name, price, quantity){
    let product ={};
    product.name = name;
    product.id = uuid();
    product.price = price;
    product.quantity = quantity;
    this.setState({ storeProds: this.state.storeProds.concat(product) })
  },
  render(){
    return(
      <div>
        <NewProduct addProd = {this.addProd}/>
        <ProdList storeProds ={this.state.storeProds} />
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
