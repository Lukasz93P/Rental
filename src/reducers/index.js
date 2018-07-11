import * as redux from 'redux';
import {RentalReducer, selectedRentalReducer} from './rental-reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const init=()=>{

    const reducer = redux.combineReducers({rentals: RentalReducer,rental:selectedRentalReducer})

    const store= redux.createStore(reducer,redux.applyMiddleware(thunk, logger));

    return store
}