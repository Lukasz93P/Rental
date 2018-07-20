import * as redux from 'redux';
import {RentalReducer, RentalBookingsReducer,selectedRentalReducer, RentalManageReducer,BookingsManageReducer} from './rental-reducer';
import {authReducer} from './auth-reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reducer as formReducer} from 'redux-form';


export const init=()=>{

    const reducer = redux.combineReducers({rentals: RentalReducer,rental:selectedRentalReducer,form:formReducer,
        auth:authReducer,rentalsManage:RentalManageReducer, bookingsManage:BookingsManageReducer,rentalBookings:RentalBookingsReducer})

    const store= redux.createStore(reducer,redux.applyMiddleware(thunk,logger));

    return store
}