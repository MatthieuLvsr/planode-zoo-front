import { Context, FormEvent, SyntheticEvent, useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextProps } from "../../context";
import { AnimalsService, EnclosureService } from "../../services";
import "../Forms/form.scss"
import "./animal.scss"
import { Animal } from "../../dto";

export interface AnimalUpdateAttributes{
    animal: Animal,
    cancelFunction: () => void,
    uptodate: boolean
    setUptodate: (current:boolean) => void
}

export const AnimalUpdate = (attributes:AnimalUpdateAttributes) => {
    const { token } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);
    const [enclosureList,setEnclosureList] = useState<string[]>([])
    const [name,setName] = useState<string>(attributes.animal.name);
    const [description,setDescription] = useState<string>(attributes.animal.description);
    const [enclosure,setEnclosure] = useState<string>(attributes.animal.enclosure as string);
    const [image,setImage] = useState<string>(attributes.animal.image);
    const [species,setSpecies] = useState<string>(attributes.animal.species);
    const [age,setAge] = useState<number>(attributes.animal.age);
    

    useEffect(()=>{
        const fetchEnclosures = async () => {
            const response = await EnclosureService.getEnclosures(token)
            if(response && Array.isArray((response))){
                const names:string[] = []
                response.forEach(enclosure => {
                    names.push(enclosure.name)
                })
                
                setEnclosureList(names)
            }     
        }
        if(token !== "")fetchEnclosures()
        else setEnclosureList([])
        
    },[token]);

    const handleSubmit = (event:FormEvent) => {
        event.preventDefault();
        const updateAnimal = async (animal:Animal):Promise<Animal|null> => {
            const response = await AnimalsService.updateAnimal(animal)
            if(response !== null){
                attributes.setUptodate(!attributes.uptodate)   
                attributes.cancelFunction()
            }         
            return response
        }
        if(
            name !== "" &&
            description !== "" &&
            enclosure !== "" &&
            image !== "" &&
            species !== "" &&
            age !== null
        ){
            const updatedAnimal:Animal = {
                name,
                description,
                image,
                species,
                age,
                enclosure
            }
            updateAnimal(updatedAnimal)            
        }
    }

    const handleChangeName = (event:SyntheticEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }

    const handleChangeDescription = (event:SyntheticEvent<HTMLTextAreaElement>) => {
        setDescription(event.currentTarget.value)
    }

    const handleChangeImage = (event:SyntheticEvent<HTMLInputElement>) => {
        setImage(event.currentTarget.value)
    }

    const handleChangeEnclosure = (event:SyntheticEvent<HTMLSelectElement>) => {
        setEnclosure(event.currentTarget.value)
    }

    const handleChangeSpecies = (event:SyntheticEvent<HTMLInputElement>) => {
        setSpecies(event.currentTarget.value)
    }

    const handleChangeAge = (event:SyntheticEvent<HTMLInputElement>) => {
        setAge(parseInt(event.currentTarget.value))
    }

    return(
        <div className="animalEditor">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Editor</h2>
                    <div className="form-line">
                        <div className="form-item">
                            <label>Name</label>
                            <input onChange={handleChangeName} type="text" value={name}/>
                        </div>
                        <div className="form-item">
                            <label>Age</label>
                            <input onChange={handleChangeAge} type="number" value={age}/>
                        </div>
                    </div>
                    <div className="form-line">
                        <div className="form-item">
                            <label>Species</label>
                            <input onChange={handleChangeSpecies} type="text" value={species}/>
                        </div>
                        <div className="form-item">
                            <label>Enclosure</label>
                            <select onChange={handleChangeEnclosure}>
                                <option>--Select enclosure--</option>
                                {enclosureList.map((enclosure,index)=>(
                                    <option selected={enclosure == attributes.animal.enclosure} key={index} value={enclosure}>{enclosure}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-line">
                        <div className="form-item">
                            <label>Image</label>
                            <input onChange={handleChangeImage} type="text" value={image}/>
                        </div>
                    </div>
                    <div className="form-line">
                        <div className="form-item">
                            <label>Description</label>
                            <textarea onChange={handleChangeDescription} value={description}/>
                        </div>
                    </div>
                    <div className="form-line">
                        <input onClick={attributes.cancelFunction} type="submit" value="CANCEL" />
                        <input type="submit" value="UPDATE" />
                    </div>
                </form>
            </div>
    )
}