import React from 'react';
import * as moment from 'moment'
import {Link} from 'react-router-dom'
import * as actions from '../../../actions/index';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {isPassed} from '../../../helpers/index'

class BookingListCard extends React.Component{

 
    render(){
        const {booking}=this.props
        const passed=isPassed(booking)
        return(
            <div className="card mb-3 col-6 text-center text-secondary row justify-content-center" >
            <div className="card-header text-center">{moment(booking.startAt).format('Y/MM/DD')} - {moment(booking.endAt).format('Y/MM/DD')}</div>
            <div className="card-body">
            {booking.canceled &&           
            <div className='alert alert-warning row justify-content-center'>
                <div className='col-6 '><h2>Canceled</h2></div>
            </div>}
            {passed && 
                <div className='alert alert-warning row justify-content-center'>
                    <div className='col-6 '><h2>Passed</h2></div>
            </div>}
                <h5 className="card-title text-center">Receivables: {booking.totalPrice}</h5>
                <p className="card-text text-center">Guests: {booking.guests}</p>
                <p className="card-text text-center">Days: {booking.days}</p>
            </div>
        </div>
            

        )
    }

}

export default BookingListCard
