import React, { Component } from 'react';
import Header from './shared/Header';
import './App.css';
import RentalList from "./components/rental/rental-listing/RentalList";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import { Route, Link,Redirect } from 'react-router-dom'
import {Provider} from 'react-redux';
import RentalListing from './components/rental/rental-listing/RentalListing';
const store=require("./reducers").init();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header/>
          <div className='container'>
            <Route exact path="/" render={()=>{return <Redirect to="/rentals"/>}}/>
            <Route exact path="/rentals" render={()=><RentalListing/>}/>
            <Route exact path="/rentals/:id" component={RentalDetail}/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
