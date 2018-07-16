import React from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import Errors from '../shared/form/errors'

const BookingModal=(props)=>{

    const {open,close,confirm, starting,ending,guests,rental, days,totalPrice,errors}=props
    return(
        <div>
        <Modal open={open} onClose={close} center>
        <h4 className='modal-title title'>Confirm Booking </h4>
            <p className='dates'>{starting} / {ending}</p>
            <div className='modal-body'>
            <em>{days}</em> nights /
            <em>{rental.dailyRate} $</em> per Night
            <p>Guests: <em>{guests}</em></p>
            <p>Price: <em>{totalPrice} $ </em></p>
            <p>Do you confirm your booking for selected days?</p>
            </div>
            <Errors errors={errors}/>
            <div className='modal-footer'>
            <button type='button' onClick={confirm} className='btn btn-bwm'>Confirm</button>
            <button type='button' onClick={close} className='btn btn-bwm'>Cancel</button>
            </div>
        </Modal>
      </div>

    )


}

export default BookingModal

