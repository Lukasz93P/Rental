import React from 'react';
import {Cacher} from '../../services/cacher';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle,
    InfoWindow,
  } from "react-google-maps";
  
const MapComponent=(props)=>{

    const {coordinates,isError}=props
    return(
        <GoogleMap
        defaultZoom={15}
        defaultCenter={{lat:parseFloat(coordinates.lat), lng:parseFloat(coordinates.lng)}}
        center={{lat:parseFloat(coordinates.lat), lng:parseFloat(coordinates.lng)}}
        options={{disableDefaultUI:isError ? true : false}}
      >
        
            {!isError && <Circle
            center={coordinates}
            radius={350}
            />}
            {isError &&
            <InfoWindow position={coordinates}>
                <div>
                    Location not found
                </div>
            </InfoWindow>}
        </GoogleMap>
    )
}

const withGeocode=(WrappedComponent)=>{



    return class extends React.Component{

        constructor(){
            super()
            this.cacher=new Cacher();
            this.state={
                coordinates:{
                    lat:parseFloat(0),
                    lng:parseFloat(0),
                },
                isError:false,
            }
    
        }

        componentWillMount(){
            this.locate();
            console.log(this.cacher)
        }

        locate=()=>{
            
            const location=this.props.loc;
            //const location='464574hbdfghtfu6dhtfhf';
            if(this.cacher.isValueCached(location)){
                this.setState({coordinates:this.cacher.getCachedValue(location)})
            }
            else {this.locateNewLocation(location)
                .then(resolve=>{this.setState({coordinates:resolve})
                this.cacher.cacheValue(location, resolve) },
                    error=>{console.log(error)
                        this.setState({isError:true})
                    })
                

            }
        }


        locateNewLocation=(location)=>{

            const coder = new window.google.maps.Geocoder();
            return new Promise((resolve,reject)=>{

                coder.geocode({address: location},(result,status)=>{
                    if(status==='OK'){
                        const geo=result[0].geometry.location
                        const loc={lat:geo.lat(), lng:geo.lng()}
                        resolve(loc)
                    }

                    else reject('We have an error');
                })

            })

        }


        render(){
            return <WrappedComponent {...this.state} />
        }

    }

}

export const MapWithAMarker = withScriptjs(withGoogleMap(withGeocode(MapComponent)));

