import React from 'react';
import * as moment from 'moment'
import {Link} from 'react-router-dom'

const BookingCard=(props)=>{

    const {booking}=props
    
    return(
        <div className='col-6 m-top-4'>
            <div className="card">
            <div className="card-header ">
                {booking.days} day/s in {booking.rental.title}
            </div>
            <div className="card-body d-flex-justify-center">
                <h4 className="card-title">{moment(booking.startAt).format('Y/MM/DD')} - {moment(booking.endAt).format('Y/MM/DD')}</h4>
                <h5>Price: {booking.totalPrice}</h5>
                <Link to={`/rentals/${booking.rental._id}`}><button className='btn btn-success'>See booked rental</button></Link>
                <button className='btn btn-danger'>Cancel booking</button>
            </div>
            </div>
        </div>
        

    )


}

export default BookingCard


