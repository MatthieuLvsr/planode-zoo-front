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
            name: "singe",
            description: "enclos des singes",
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
        const response = await axios.post("http://localhost:5000/enclosure/create",test,{
            headers:{
                Authorization: `Bearer ${"64b90fe38d2055e1b344fbda"}`
            }
        })
        return response.data
    }
}