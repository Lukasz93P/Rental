import React, { Component } from 'react';
import Header from './components/shared/Header';
import './App.css';
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import { Route,Redirect } from 'react-router-dom'
import {Provider} from 'react-redux';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalSearch from './components/rental/rental-listing/RentalSearch';
import {Register} from './components/register/Register';
import Login from './components/login/Login';
import * as actions from './actions/index'
import {ProtectedRoute} from './components/shared/auth/ProtectedRoute'
import {LoggedinRoute} from './components/shared/auth/LoggedinRoute'
import {withRouter} from 'react-router-dom'

const store=require("./reducers").init();

class App extends Component {

  componentWillMount=()=>{

    this.checkAuthState()


  }

  checkAuthState=()=>{

    store.dispatch(actions.checkAuthState())

  }

  logout=()=>{

    store.dispatch(actions.logout())
    this.props.history.push('/rentals')

  }




  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header logout={this.logout} />
          <div className='container'>
            <Route exact path="/" render={()=>{return <Redirect to="/rentals"/>}}/>
            <Route exact path="/rentals" render={()=><RentalListing/>}/>
            <ProtectedRoute exact path="/rentals/:id" component={RentalDetail}/>
            <Route exact path='/login' component={Login}/>
            <LoggedinRoute exact path='/register' component={Register}/>
            <Route exact path="/rentals/:city/homes" component={RentalSearch}/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default withRouter(App);
