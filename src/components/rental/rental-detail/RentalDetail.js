import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';

class RentalDetail extends Component{


    render(){
        if(this.props.isPending)
            return <h1>Loading, please wait</h1>
        return(
            <div>
                <h1>{this.props.selectedRental.title}</h1>
            </div>
        )
    }

    componentWillMount=()=>{

        const rentalId=this.props.match.params.id
        this.props.dispatch(actions.fetchRentalById(rentalId));

    }


}

function mapStateToProps(state){

    return{

        selectedRental:state.rental.data,
        isPending:state.rental.isPending,

    }

}

export default connect(mapStateToProps)(RentalDetail)