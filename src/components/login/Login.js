import React from 'react'
import LoginForm from './LoginForm'
import * as actions from '../../actions/index.js';
import {connect} from 'react-redux';

class Login extends React.Component{

    login=(values)=>{
        
        this.props.dispatch(actions.login(values))
        console.log("Login component",values)

    }


    render(){
        return(
            <section id='register'>
                <div className='bwm-form'>
                    <div className='row'>
                    <div className='col-md-5'>
                        <h1>Login</h1>
                        <LoginForm login={this.login} errors={this.props.errors}/>
                    </div>
                    <div className='col-md-6 ml-auto'>
                        <div className='image-container'>
                        <h2 className='catchphrase'>As our member you have access to most awesome places in the world.</h2>
                        <img src='' alt=""/>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

        )

        

    }

}

function mapStateToProps(state){
    const {isAuth,token,errors}=state.auth
    return {
        isAuth:isAuth,
        token:token,
        errors:errors,
    }
}

export default connect(mapStateToProps)(Login)