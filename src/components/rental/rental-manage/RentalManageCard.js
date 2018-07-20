import React from 'react';
import * as moment from 'moment'

const RentalManageCard=({rental})=>{

    return(
        <div className='col-6'>
            <div className="card">
            <div className="card-header">
                {rental.title}
            </div>
            <div className="card-body">
                <h5 className="card-title">Rental Details</h5>
                
                <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Check bookings
                </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {rental.bookings.map((booking,index)=><button key={index} classsavedRental="btn btn-success dropdown-item" >{moment(booking.startAt).format('Y/MM/DD')} - {moment(booking.endAt).format('Y/MM/DD')}</button>)}>
                    </div>
                </div>
                
            </div>
            </div>
        </div>
        

    )


}

export default RentalManageCard


