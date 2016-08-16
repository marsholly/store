import React from 'react';
import AddStoreProds from './addStoreProds';
// import '../css/style.css';

const App = React.createClass({
  render(){
    return (
      <div className = 'container'>
        <div className ='row'>
          <AddStoreProds />
        </div>
      </div>
    )
  }
})

export default App;
