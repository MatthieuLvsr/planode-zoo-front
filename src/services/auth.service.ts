import axios from "axios";
import { Session } from "../dto";

export class AuthService{
    static login = async (login:string, password:string):Promise<Session|null> => {
        const response = await axios.post(process.env.REACT_APP_API_URL + "/auth/login",{
            login,
            password
        },{
            headers:{
                Authorization:"Bearer 64b90fe38d2055e1b344fbda"
            }
        })
        if(response.data)return response.data
        return null
    }

    static logout = async (token:string):Promise<void> => {
        const response = await axios.post(process.env.REACT_APP_API_URL + "/auth/logout",{},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    }
}