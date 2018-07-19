import React from 'react'
import * as actions from '../../../actions/index';
import {connect} from 'react-redux';

class RentalManage extends React.Component{

    componentWillMount(){

        
        this.props.dispatch(actions.fetchUsersRentals())

    }

    render(){
        const {rentals}=this.props.rentalsManage
        if(rentals&&rentals.length>0)
            return(
                <div>
                    {rentals.map((rental,index)=> <p key={index}>{rental.title}</p>)}
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