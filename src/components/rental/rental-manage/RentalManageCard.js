import React from 'react';
import * as moment from 'moment'
import {Link} from 'react-router-dom'

const RentalManageCard=(props)=>{

    const {onDelete,rental}=props
    
    return(
        <div className='col-6 m-top-4'>
            <div className="card">
            <div className="card-header ">
                {rental.title}
            </div>
            <div className="card-body d-flex-justify-center">
                <h4 className="card-title">Rental Details</h4>
                <h5>{rental.city} {rental.street}</h5>
                <h5>Daily rate: {rental.dailyRate}</h5>
                <h6>Added at : {moment(rental.createdAt).format('Y/MM/DD')}</h6>
                <Link to={`/rentals/manage/rentalbookings/${rental._id}`}><button className='btn btn-success'>See bookings</button></Link>
                <button onClick={()=>onDelete(rental._id)}className='btn btn-danger'>Delete</button>
            </div>
            </div>
        </div>
        

    )


}

export default RentalManageCard


