import React from 'react';
import * as moment from 'moment'
import {Link} from 'react-router-dom'

const RentalManageCard=(props)=>{

    const {onDelete,rental}=props
    
    return(
        <div className='col-6 m-top-4 text-center text-secondary'>
            <div className="card">
            <div className="card-header ">
                <h3>{rental.title}</h3>
            </div>
            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={`#collapse${rental._id}`} aria-expanded="false" aria-controls={`#collapse${rental._id}`}>
                Click for details
            </button>
            <div class="collapse" id={`collapse${rental._id}`}>
            <div className="card-body  d-flex-justify-center">
                <h4 className="card-title">Rental Details</h4>
                <h5>{rental.city} {rental.street}</h5>
                <h5>Daily rate: {rental.dailyRate}</h5>
                <h6>Added at : {moment(rental.createdAt).format('Y/MM/DD')}</h6>
                <Link to={`/rentals/manage/rentalbookings/${rental._id}`}><button className='btn btn-success'>See bookings ({rental.bookings.length})</button></Link>
                <button onClick={()=>onDelete(rental._id)}className='btn btn-danger ml-3'>Delete</button>
            </div>
            </div>
            </div>
        </div>
        

    )


}

export default RentalManageCard


