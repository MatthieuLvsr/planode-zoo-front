import { Context, SyntheticEvent, useContext, useEffect, useState } from "react"
import { AnimalsService, EnclosureService } from "../../services"
import { Animal } from "../../dto"
import "./animal.scss"
import { Link } from "react-router-dom"
import { AnimalUpdate } from "./AnimalUpdate"
import { AuthContext, AuthContextProps } from "../../context"

export const Animals = () =>{
    const { token } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);
    const [animals,setAnimals] = useState<Animal[]>([])
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
    const [uptodate,setUptodate] = useState<boolean>(false)

    useEffect(()=>{        
        const fetchAnimals = async () => {
            const data = await AnimalsService.getAnimals();
            setAnimals(data);
        }
        fetchAnimals();
        // setInterval(fetchAnimals,1000);
    },[uptodate])

    const handleUpdate = (event:SyntheticEvent<HTMLElement>) => {
        const target = event.target as HTMLDivElement
        const index = target.parentElement?.getAttribute("data-index");
        if(index)setSelectedAnimal(animals[parseInt(index)])
    }

    const handleCancel = () => {
        setSelectedAnimal(null);
    }

    return(
        <div className="animals">
        {animals.length === 0 &&
        <p>Loading...</p>
        }

        {animals.length > 0 &&
        <>
            <h2>Animals' list</h2>
                <div className="animalTable">
                    <div className="thead">
                        <div className="col colH">IMAGE</div>
                        <div className="col colH">NAME</div>
                        <div className="col colH">AGE</div>
                        <div className="col colH speciesCol">SPECIES</div>
                        <div className="col colH descriptionCol">DESCRIPTION</div>
                        {token !== "" &&
                            <div className="col colH">ACTION</div>
                        }
                    </div>
                    <div className="tbody">
                        {animals.map((animal:Animal, index:number) => (
                            <div className="trow" key={index} data-index={index}>
                                <div className="col imgCol" style={{backgroundImage:`url(${animal.image})`}}></div>
                                <div className="col">{animal.name}</div>
                                <div className="col">{animal.age} ans</div>
                                <div className="col speciesCol">{animal.species}</div>
                                <div className="col descriptionCol">{animal.description}</div>
                                {token !== "" &&
                                    <div className="col actionCol" onClick={handleUpdate}>UPDATE</div>
                                }
                            </div>
                        ))}
                    </div>
                    <Link className="main-btn" to={"/animals/add"}><button>ADD</button></Link>
                </div>
        </>
        }
        {selectedAnimal !== null &&
            <AnimalUpdate uptodate={uptodate} setUptodate={setUptodate} animal={selectedAnimal} cancelFunction={handleCancel}/>
        }
        </div>
    )
}