import axios from "axios";
import { Enclosure } from "../dto";

export class EnclosureService{
    static getEnclosures = async (token:string):Promise<Enclosure[]> => {
        const response = await axios.get(process.env.REACT_APP_API_URL + "/enclosure",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        if(response.data && Array.isArray((response.data)))return response.data;
        return []
    }

    static addEnclosure = async (enclosure:Enclosure, token:string):Promise<Enclosure|null> => {
        console.log(enclosure);
        console.log(token);  
        const test = {
            name: "dino",
            description: "enclos des dinos",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.wikipedia.org%2Fwiki%2FLion&psig=AOvVaw3rYfqXnpcGecxMn-tXvBpQ&ust=1687861656770000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCI5OXc4P8CFQAAAAAdAAAAABAE.jpg",
            type: "petting zoo",
            capacity: 15,
            openingHours: "09:00-17:00",
            duration: 5,
            status: true,
            bestMaintenanceMonth: 5,
            handicapAccessible: true,
            animals: []
        }      
        
        const response = await axios.post(process.env.REACT_APP_API_URL + "/enclosure/create",{
            name: "dino",
            description: "enclos des dinos",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.wikipedia.org%2Fwiki%2FLion&psig=AOvVaw3rYfqXnpcGecxMn-tXvBpQ&ust=1687861656770000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCI5OXc4P8CFQAAAAAdAAAAABAE.jpg",
            type: "petting zoo",
            capacity: 15,
            openingHours: "09:00-17:00",
            duration: 5,
            status: true,
            bestMaintenanceMonth: 5,
            handicapAccessible: true,
            animals: []
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
}