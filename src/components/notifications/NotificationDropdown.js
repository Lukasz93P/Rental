import React from 'react'
import * as actions from '../../actions/index'
import {connect} from 'react-redux';
//import Warnings from '../../shared/Warnings'
import  NotificationCarouselItem from './NotificationCarouselItem'

class NotificationCarousel extends React.Component{

    componentWillMount(){

        this.fetchUsersNotifications()

    }

    fetchUsersNotifications=()=>{

        this.props.dispatch(actions.fetchUsersNotifications())

    }

    onNotificationClick=(notificationId)=>{

        actions.makeNotificationNotNew(notificationId)

    }


    render(){
        const {notifications,errors}=this.props.notifications
        const newNotifications=notifications.filter(notification=>notification.new)
        if(newNotifications&& newNotifications.length>0)
            return(
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                {newNotifications.map((notification,index)=>{if(notification.new){ if(index===0) return (<div key={index} className="carousel-item active">
                       <NotificationCarouselItem onNotificationClick={this.onNotificationClick} key={index} notification={notification}/>
                    </div>)
                else return <div key={index} className="carousel-item">
                <NotificationCarouselItem onNotificationClick={this.onNotificationClick} key={index} notification={notification}/>
             </div>
                
            }})}
                <ol className="carousel-indicators ">
                    {newNotifications.map((notification,index)=>{if(notification.new){ if(index===0) return (<li key={index} className='active' data-target="#carouselExampleIndicators" data-slide-to={index}></li>)
                    return <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index}></li>}})    
                    }
                </ol>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>

            )

            return(

            <div>
            </div>
        )
    }


}

function mapStateToProps(state){
    return {
        notifications:state.notifications,
    }
}




export default connect(mapStateToProps)(NotificationCarousel)