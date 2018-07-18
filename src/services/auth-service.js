import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class AuthService{

    tokenKey='auth_token'

    getToken=()=>{
        return localStorage.getItem(this.tokenKey);
    }


    tokenTimeValidation=(token)=>{
        const decodedToken=this.decodeToken(token)

        return moment().isBefore(moment.unix(decodedToken.exp))
    }

    decodeToken=(token)=>{
        return jwt.decode(token)
    }
    
    getUsername=()=>{
        return this.decodeToken(this.getToken()).username
    }

    isTokenValid=()=>{
        const token= this.getToken()
        if(token)
            return this.tokenTimeValidation(token)
        return false;
    }

    sendToken=(token)=>{

        localStorage.setItem(this.tokenKey,token)

    }

    invalidate=()=>{
        localStorage.removeItem(this.tokenKey)
    }
}

export default new AuthService()