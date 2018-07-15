import axios from'axios'
import AuthService from './auth-service'
import authService from './auth-service';

class AxiosService{

    axiosInstance={}

    constructor(){

        this.initInstance()

    }

    initInstance=()=>{

        this.axiosInstance=axios.create({

            baseURL:'http://localhost:3000/api/v1',
            timeout:3000,
        });

        this.axiosInstance.interceptors.request.use(
            config=>{
                const token=authService.getToken()
                if(token){
                    config.headers.Authorization= `Bearer ${token}`
                }
                return config
            }


        )
        return this.axiosInstance
    }

    getInstance(){

        return this.axiosInstance || this.initInstance()

    }

}

export default new AxiosService()