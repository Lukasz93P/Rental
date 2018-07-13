import React, { Component } from 'react';
import Header from './shared/Header';
import './App.css';
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import { Route,Redirect } from 'react-router-dom'
import {Provider} from 'react-redux';
import RentalListing from './components/rental/rental-listing/RentalListing';
import {Register} from './components/register/Register';
import Login from './components/login/Login';

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
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
