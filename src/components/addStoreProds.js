import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import EditProd from './editProd';

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
  editProd(){
    <EditProd id={this.props.id} name={this.props.name} price={this.props.price} quantity={this.props.quantity}/>
  },
  render(){
    return(
    <tr key={this.props.id}>
      <td>{this.props.name}</td>
      <td>{this.props.price}</td>
      <td>{this.props.quantity}</td>
      <td><button className='btn btn-danger' onClick={()=>this.props.removeProd(this.props.id)}>Delete</button></td>
      <td><button className='btn btn-success' onClick={this.editProd}>Edit</button></td>
    </tr>)
  }
})

const ProdList = React.createClass({
  render(){
    let products = this.props.storeProds.map(product=>{
      return <Product key={product.id} name={product.name} id={product.id} price ={product.price} quantity = {product.quantity} removeProd={this.props.removeProd}/>
    });
    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products}
        </tbody>
      </table>
    )
  //  console.log(id);
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
    let product = {};
    product.name = name;
    product.id = uuid();
    product.price = price;
    product.quantity = quantity;
    this.setState({ storeProds: this.state.storeProds.concat(product) })
  },
  removeProd: function(id){
    this.setState({storeProds: this.state.storeProds.filter(s => s.id !== id)
    });
  },
  render(){
    return(
      <div>
        <NewProduct addProd = {this.addProd}/>
        <ProdList storeProds ={this.state.storeProds} removeProd={this.removeProd}/>
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
