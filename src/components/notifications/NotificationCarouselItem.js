import React from 'react'
import {Link} from 'react-router-dom'
import * as moment from 'moment'


const NotificationCarouselItem=(props)=>{

    const setButtonColor=(type)=>{

        if(type==='canceled')
            return 'danger'
        if(type==='success')
            return 'success'
    
    }



    const {notification,onNotificationClick}=props
    return(
        <div className="row justify-content-center text-center mb-5" >
            <button className={`btn btn-${setButtonColor(notification.type)} w-100`} onClick={()=>onNotificationClick(notification._id)} type="button" data-toggle="collapse" data-target={`#${notification._id}`} aria-expanded="false" aria-controls={notification._id}>
                {notification.message}
            </button>
            <div className="collapse self-allign-center" id={notification._id}>
            <div className="card card-body w-100">
                <a>Booking time: {moment(notification.booking.startAt).format('Y/MM/DD')} - {moment(notification.booking.endAt).format('Y/MM/DD')}</a>
                <a>Payment: {notification.booking.totalPrice}</a>
                 <Link to={`rentals/${notification.rental._id}`}><button className='btn btn-primary'>See rental</button></Link>
            </div>
            </div>
        
        </div>

    )

}



export default NotificationCarouselItem