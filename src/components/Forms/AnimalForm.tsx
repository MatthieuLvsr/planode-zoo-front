import { Context, FormEvent, SyntheticEvent, useContext, useEffect, useState } from "react"
import { AuthContext, AuthContextProps } from "../../context";
import "./form.scss"
// import axios from "axios";
import { AnimalsService } from "../../services";
import { Animal } from "../../dto";
// import { useLocation } from "react-router-dom";
import { EnclosureService } from "../../services/enclosure.service";

export interface AnimalFormAttributes{
    animal?:Animal
}

export const AnimalForm = () => {
    const { token } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);

    // const location = useLocation();
    // useEffect(()=>{
    //     const currentAnimal = location.state && location.state.animal;
    //     // console.log(currentAnimal);
        
    //     if(currentAnimal)setAnimal(currentAnimal)
    // },[])

    const [speciesList, setSpeciesList] = useState<string[]>([]);

    const [animal,setAnimal] = useState<Animal|null>(null);

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState("");
    const [species,setSpecies] = useState("");
    const [age,setAge] = useState(0);
    const [enclosure,setEnclosure] = useState("");

    useEffect(()=>{
        const fetchSpecies = async () => {
            const response = await EnclosureService.getEnclosures(token)
            if(response && Array.isArray((response))){
                const names:string[] = []
                response.forEach(enclosure => {
                    names.push(enclosure.name)
                })
                
                setSpeciesList(names)
            }     
        }
        if(token !== "")fetchSpecies()
        else setSpeciesList([])
        
    },[token])

    const handleChangeName = (event:SyntheticEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }

    const handleChangeImage = (event:SyntheticEvent<HTMLInputElement>) => {
        setImage(event.currentTarget.value)
    }

    const handleChangeDescription = (event:SyntheticEvent<HTMLTextAreaElement>) => {
        setDescription(event.currentTarget.value)
    }

    const handleChangeSpecies = (event:SyntheticEvent<HTMLInputElement>) => {
        setSpecies(event.currentTarget.value)
    }

    const handleChangeAge = (event:SyntheticEvent<HTMLInputElement>) => {
        setAge(parseInt(event.currentTarget.value, 10))
    }

    const handleChangeEnclosure = (event:SyntheticEvent<HTMLSelectElement>) => {
        setEnclosure(event.currentTarget.value)
    }

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        
        const addAnimal = async () => {
            if(
                name !== "" &&
                description !== "" &&
                species !== "" &&
                enclosure !== "" &&
                image !== ""
            ){                
                const newAnimal = {
                    name,
                    description,
                    image,
                    species,
                    age,
                    enclosure
                }    
                const response = await AnimalsService.addAnimal(newAnimal);                
            }
        }        
        const updateAnimal = async () => {
            if(
                name !== "" &&
                description !== "" &&
                species !== "" &&
                enclosure !== "" &&
                image !== ""
            ){                
                const updatedAnimal = {
                    name,
                    description,
                    image,
                    species,
                    age,
                    enclosure
                }    
                const response = await AnimalsService.updateAnimal(updatedAnimal);                
            }
        }
        event.preventDefault();
        animal ? updateAnimal() : addAnimal()
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>{animal ? "Update an animal" :  "Add a new animal"}</h2>
            <div className="form-line">
                <div className="form-item">
                    <label>Name</label>
                    <input onChange={handleChangeName} type="text" value={animal?.name}/>
                </div>
                <div className="form-item">
                    <label>Age</label>
                    <input onChange={handleChangeAge} type="number" value={animal?.age}/>
                </div>
            </div>
            <div className="form-line">
                <div className="form-item">
                    <label>Species</label>
                    <input onChange={handleChangeSpecies} type="text" value={animal?.species}/>
                </div>
                <div className="form-item">
                    <label>Enclosure</label>
                    <select onChange={handleChangeEnclosure}>
                        <option>Select an enclosure</option>
                        {speciesList.map((species,index) => (
                            <option key={index} value={species}>{species}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-line">
                <div className="form-item">
                    <label>Image link</label>
                    <input onChange={handleChangeImage} type="text" value={animal?.image}/>
                </div>
            </div>
            <div className="form-line">
                <div className="form-item">
                    <label>Description</label>
                    <textarea onChange={handleChangeDescription} value={animal?.description}/>
                </div>
            </div>
            <input type="submit" value={animal ? "UPDATE" : "ADD"}/>
        </form>
    )
}