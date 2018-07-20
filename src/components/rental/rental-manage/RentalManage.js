import React from 'react'
import * as actions from '../../../actions/index';
import {connect} from 'react-redux';
import RentalManageCard from './RentalManageCard'

class RentalManage extends React.Component{

    componentWillMount(){

        
        this.props.dispatch(actions.fetchUsersRentals())

    }

    render(){
        const {rentals}=this.props.rentalsManage
        if(rentals&&rentals.length>0)
            return(
                <div className='row container '>
                    {rentals.map((rental,index)=> <RentalManageCard className='p-3 m-3 d-inline-blok ' key={index} rental={rental}/>)}
                </div>
            )
        return(

            <h1>Rental Manage</h1>


        )
    }


}

function mapStateToProps(state){
    return {
        rentalsManage:state.rentalsManage,
    }
}




export default connect(mapStateToProps)(RentalManage)