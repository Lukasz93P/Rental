import React from 'react'
import {Link} from 'react-router-dom'
import * as moment from 'moment'


const DropdownMenuNotification=(props)=>{

    const keepDropDownOpen = () => {
        window.$('#dropDownOpen').addClass('open');
      }

    const {notification}=props
    return(
        <div className="dropdown-item w-100" >
            <button onclick={keepDropDownOpen} className="btn btn-primary w-100" type="button" data-toggle="collapse" data-target={`#${notification._id}`} aria-expanded="false" aria-controls={notification._id}>
                {notification.message}
            </button>
            <div className="collapse" id={notification._id}>
            <div className="card card-body w-100">
                <a>Booking time: {moment(notification.booking.startAt).format('Y/MM/DD')} - {moment(notification.booking.endAt).format('Y/MM/DD')}</a>
                <a>Payment: {notification.booking.totalPrice}</a>
                 <Link to={`rentals/${notification.rental._id}`}><button className='btn btn-primary'>See rental</button></Link>
            </div>
            </div>
        
        </div>

    )

}

export default DropdownMenuNotification