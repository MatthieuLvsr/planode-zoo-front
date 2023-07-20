import { useEffect, useState } from "react"
import { AnimalsService } from "../../services"
import { Animal } from "../../dto"
import "./animal.scss"
import { Link } from "react-router-dom"

export const Animals = () =>{
    const [animals,setAnimals] = useState<Animal[]>([])
    useEffect(()=>{        
        const fetchAnimals = async () => {
            const data = await AnimalsService.getAnimals();
            setAnimals(data);
        }
        fetchAnimals();
        // setInterval(fetchAnimals,1000);
    },[])
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
                    </div>
                    <div className="tbody">
                        {animals.map((animal:Animal, index:number) => (
                            <div className="trow" key={index}>
                                <div className="col imgCol" style={{backgroundImage:`url(${animal.image})`}}></div>
                                <div className="col">{animal.name}</div>
                                <div className="col">{animal.age} ans</div>
                                <div className="col speciesCol">{animal.species}</div>
                                <div className="col descriptionCol">{animal.description}</div>
                            </div>
                        ))}
                    </div>
                    <Link className="main-btn" to={"/animals/add"}><button>ADD</button></Link>
                </div>
        </>
        }
        </div>
    )
}