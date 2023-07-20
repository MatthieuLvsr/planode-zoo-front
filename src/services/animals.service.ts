import axios from "axios";
import { Animal } from "../dto";

export class AnimalsService {
    static getAnimals = async ():Promise<Animal[]> => {
        const response = await axios.get(process.env.REACT_APP_API_URL + "/animal")        
        if(response.data && Array.isArray((response.data)))return response.data
        return []
    }

    static addAnimal = async (animal:Animal):Promise<Animal|null> => {
        console.log(animal);
        
        const response = await axios.post(process.env.REACT_APP_API_URL + "/animal/create",{
            name:animal.name,
            description:animal.description,
            image:animal.image,
            species:animal.species,
            age:animal.age,
            enclosure:animal.enclosure
        })
        return response.data
    }

    static updateAnimal = async (animal:Animal):Promise<Animal|null> => {
        
        const response = await axios.patch(process.env.REACT_APP_API_URL + `/animal/${animal.name}`,{
            description:animal.description,
            image:animal.image,
            species:animal.species,
            age:animal.age,
            enclosure:animal.enclosure
        })
        return response.data
    }
}