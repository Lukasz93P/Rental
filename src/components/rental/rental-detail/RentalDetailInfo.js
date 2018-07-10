import React from 'react'
import RentalAssets from "./RentalAssets";
import * as helpers from '../../../helpers/index.js'

const RentalDetailInfo=({rental})=>{
    
    return(

        <div className='rental'>
            <h2 className={`rental-type ${rental.category}`}>{helpers.rentalType(rental.shared)} {rental.category}</h2>
            <h1 className='rental-title'>{helpers.capitalize(rental.title)}</h1>
            <h2 className='rental-city'>{helpers.capitalize(rental.city)}</h2>
            <div className='rental-room-info'>
                <span><i className='fa fa-building'></i>{rental.bedrooms} bedrooms</span>
                <span><i className='fa fa-user'></i> {rental.bedrooms + 4} guests</span>
                <span><i className='fa fa-bed'></i> {rental.bedrooms + 2} beds</span>
            </div>
            <p className='rental-description'>
                {rental.description}
            </p>
            <hr></hr>
            <RentalAssets/>
        </div>

    )

}

export default RentalDetailInfo