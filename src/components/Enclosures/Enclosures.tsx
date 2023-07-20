import { Context, useContext, useEffect, useState } from "react"
import { Enclosure } from "../../dto"
import { EnclosureService } from "../../services"
import { AuthContext, AuthContextProps } from "../../context";
import "./enclosure.scss"
import { Link } from "react-router-dom";

export const Enclosures = () => {

    const { token } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);

    const [enclosures,setEnclosures] = useState<Enclosure[]>([])

    useEffect(()=>{
        const fetchEnclosures = async () => {
            const response = await EnclosureService.getEnclosures(token)
            if(response && Array.isArray(response)){
                const data:Enclosure[] = []
                response.forEach(enclosure => {
                    data.push(enclosure)
                })                
                setEnclosures(data)
            }            
        }
        if(token !== "")fetchEnclosures()
    },[token])

    return(
        <div className="enclosures">
        {enclosures.length === 0 &&
        <p>Loading...</p>
        }

        {enclosures.length > 0 &&
        <>
            <h2>enclosures' list</h2>
            <div className="enclosureTable">
                <div className="thead">
                    <div className="col colH md">NAME</div>
                    <div className="col colH md">TYPE</div>
                    <div className="col colH sm">CAPACITY</div>
                    <div className="col colH md">OPEN</div>
                    <div className="col colH sm">STATUS</div>
                    <div className="col colH sm">HANDICAP ACCESS</div>
                    <div className="col colH descriptionCol lg">DESCRIPTION</div>
                </div>
                <div className="tbody">
                    {enclosures.map((enclosure:Enclosure, index:number) => (
                        <div className="trow" key={index}>
                            <div className="col md">{enclosure.name}</div>
                            <div className="col md">{enclosure.type}</div>
                            <div className="col sm">{enclosure.capacity}</div>
                            <div className="col md">{enclosure.openingHours}</div>
                            <div className="col sm">{enclosure.status ? "Open" : "Close"}</div>
                            <div className="col sm">{enclosure.handicapAccessible ? "Yes" : "No"}</div>
                            <div className="col descriptionCol lg">{enclosure.description}</div>
                        </div>
                    ))}
                </div>
                <Link className="main-btn" to={"/enclosures/add"}><button>ADD</button></Link>
            </div>
        </>
        }
        </div>
    )
}