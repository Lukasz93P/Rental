import React, { Component } from 'react';
import Header from './components/shared/Header';
import './App.css';
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import { Route,Redirect,Switch } from 'react-router-dom'
import {Provider} from 'react-redux';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalSearch from './components/rental/rental-listing/RentalSearch';
import RentalCreate from './components/rental/rental-create/RentalCreate';
import {Register} from './components/register/Register';
import Login from './components/login/Login';
import * as actions from './actions/index'
import {ProtectedRoute} from './components/shared/auth/ProtectedRoute'
import {LoggedinRoute} from './components/shared/auth/LoggedinRoute'
import {withRouter} from 'react-router-dom'
import BookingsManage from './components/booking/bookings-manage/BookingsManage';
import RentalManage from './components/rental/rental-manage/RentalManage';

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
            <Switch>
              <Route exact path="/" render={()=>{return <Redirect to="/rentals"/>}}/>
              <Route exact path="/rentals" render={()=><RentalListing/>}/>
              <ProtectedRoute path="/rentals/new" component={RentalCreate}/>
              <ProtectedRoute exact path='/rentals/manage' component={RentalManage}/>
              <ProtectedRoute exact path='/bookings/manage' component={BookingsManage}/>
              <Route exact path="/rentals/:city/homes" component={RentalSearch}/>
              <ProtectedRoute path="/rentals/:id" component={RentalDetail}/>
              <Route exact path='/login' component={Login}/>
              <LoggedinRoute exact path='/register' component={Register}/>
            </Switch>
          </div>
        </div>
      </Provider>
    );
  }
}

export default withRouter(App);
