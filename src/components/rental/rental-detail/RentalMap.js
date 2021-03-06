import React from 'react'
import {MapWithAMarker} from '../../map/GoogleMap'

export class RentalMap extends React.Component{
    
    render(){
        const {location}=this.props;
        return(
            <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                loc={location}
            />
        )
    }
}