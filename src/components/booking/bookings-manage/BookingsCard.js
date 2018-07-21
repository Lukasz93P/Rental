import React from 'react';
import * as moment from 'moment'
import {Link} from 'react-router-dom'
import * as actions from '../../../actions/index';
import {connect} from 'react-redux';

class BookingCard extends React.Component{


    cancelBooking=()=>{

        actions.cancelBooking(this.props.booking._id)
        .then(
            response=>this.props.dispatch(actions.fetchUsersBookings()),
            error=>{}
        )
        
    }


    render(){
        const {booking}=this.props
        
        return(
            <div className='col-6 m-top-4 text-center text-secondary'>
                <div className="card">
                <div className="card-header ">
                    {booking.days} day/s in {booking.rental.title}
                </div>
                <div className="card-body ">
                    {booking.canceled &&           
                    <div className='alert alert-warning row justify-content-md-center'>
                        <div className='col-6 '><h2>Canceled</h2></div>
                    </div>}
                    <h4 className="card-title">{moment(booking.startAt).format('Y/MM/DD')} - {moment(booking.endAt).format('Y/MM/DD')}</h4>
                    <h5>Price: {booking.totalPrice}</h5>
                    <Link to={`/rentals/${booking.rental._id}`}><button className='btn btn-success'>See booked rental</button></Link>
                    {!booking.canceled && 
                    <button className='btn btn-danger ml-3' onClick={this.cancelBooking}>Cancel booking</button>
                    }
                </div>
                </div>
            </div>
            

        )
    }

}

export default connect()(BookingCard)


