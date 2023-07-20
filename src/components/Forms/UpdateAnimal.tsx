import { Context, FormEvent, SyntheticEvent, useContext, useEffect, useState } from "react"
import { AuthContext, AuthContextProps } from "../../context";
import "./form.scss"
import axios from "axios";
import { AnimalsService } from "../../services";
import { Animal } from "../../dto";


export const UpdateAnimal = (attributes:Animal) => {
    const { token } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);
    const [speciesList, setSpeciesList] = useState<string[]>([]);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState("");
    const [species,setSpecies] = useState("");
    const [age,setAge] = useState(0);
    const [enclosure,setEnclosure] = useState("");

    useEffect(()=>{
        const fetchSpecies = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/enclosure",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.data && Array.isArray((response.data))){
                const names:string[] = []
                response.data.forEach(enclosure => {
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
                console.log('here');
                
                const newAnimal = {
                    name,
                    description,
                    image,
                    species,
                    age,
                    enclosure
                }
    
                const response = await AnimalsService.addAnimal(newAnimal);
                if(response)console.log(response);
                
            }
        }
        event.preventDefault();
        addAnimal();
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Add a new animal</h2>
            <div className="form-line">
                <div className="form-item">
                    <label>Name</label>
                    <input onChange={handleChangeName} type="text"/>
                </div>
                <div className="form-item">
                    <label>Age</label>
                    <input onChange={handleChangeAge} type="number"/>
                </div>
            </div>
            <div className="form-line">
                <div className="form-item">
                    <label>Species</label>
                    <input onChange={handleChangeSpecies} type="text"/>
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
                    <input onChange={handleChangeImage} type="text"/>
                </div>
            </div>
            <div className="form-line">
                <div className="form-item">
                    <label>Description</label>
                    <textarea onChange={handleChangeDescription}/>
                </div>
            </div>
            <input type="submit" value="ADD"/>
        </form>
    )
}