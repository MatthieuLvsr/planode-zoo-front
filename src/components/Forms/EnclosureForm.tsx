import { Context, FormEvent, SyntheticEvent, useContext, useState } from "react";
import { AuthContext, AuthContextProps } from "../../context";
import { Enclosure } from "../../dto";
import { EnclosureService } from "../../services";

export const EnclosureForm = () => {

    const { token } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);

    const [name,setName] = useState<string>("");
    const [capacity,setCapacity] = useState<number>(-1);
    const [type,setType] = useState<string>("");
    const [status,setStatus] = useState<boolean>(false);
    const [handicap,setHandicap] = useState<boolean>(false);
    const [description,setDescription] = useState<string>("");
    const [image,setImage] = useState<string>("");
    const [open,setOpen] = useState<string>("");
    const [maintenance,setMaintenance] = useState<number>(0);

    const handleSubmit = (event:FormEvent) => {
        event.preventDefault();
        const addEnclosure = async () => {
            if(
                name !== "" &&
                capacity >= 0 &&
                type !== "" &&
                description !== "" &&
                image !== "" &&
                open !== "" &&
                maintenance > 0
            ){
                const newEnclosure:Enclosure = {
                    name,
                    description,
                    image,
                    type,
                    capacity,
                    openingHours: open,
                    duration: 0,
                    status,
                    bestMaintenanceMonth:maintenance,
                    handicapAccessible: handicap,
                    animals: []
                }
                console.log(token);
                
                
                const response = await EnclosureService.addEnclosure(newEnclosure, token)
                console.log(response);            
            }
        }
        if(token !== "")addEnclosure()
    }

    const handleChangeName = (event:SyntheticEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }

    const handleChangeCapacity = (event:SyntheticEvent<HTMLInputElement>) => {
        setCapacity(parseInt(event.currentTarget.value))
    }

    const handleChangeType = (event:SyntheticEvent<HTMLInputElement>) => {
        setType(event.currentTarget.value)
    }

    const handleChangeOpen = (event:SyntheticEvent<HTMLInputElement>) => {
        setOpen(event.currentTarget.value)
    }
    const handleChangeImage = (event:SyntheticEvent<HTMLInputElement>) => {
        setImage(event.currentTarget.value)
    }

    const handleChangeMaintenance = (event:SyntheticEvent<HTMLSelectElement>) => {
        setMaintenance(parseInt(event.currentTarget.value))
    }

    const handleChangeStatus = (event:SyntheticEvent<HTMLSelectElement>) => {
        setStatus(event.currentTarget.value === "true" ? true : false)
    }

    const handleChangeHandicap = (event:SyntheticEvent<HTMLSelectElement>) => {
        setHandicap(event.currentTarget.value === "true" ? true : false)
    }

    const handleChangeDescription = (event:SyntheticEvent<HTMLTextAreaElement>) => {
        setDescription(event.currentTarget.value)
    }

    return(
        <form className="form" onSubmit={handleSubmit}>
            <h2>Add a new enclosure</h2>
            <div className="form-line">
                <div className="form-item">
                    <label>Name</label>
                    <input onChange={handleChangeName} type="text"/>
                </div>
                <div className="form-item">
                    <label>Type</label>
                    <input onChange={handleChangeType} type="text"/>
                </div>
            </div>
            <div className="form-line">
                <div className="form-item">
                    <label>Capacity</label>
                    <input onChange={handleChangeCapacity} type="number"/>
                </div>
                <div className="form-item">
                    <label>Open Shift</label>
                    <input onChange={handleChangeOpen} type="text"/>
                </div>
            </div>
            <div className="form-line">
                <div className="form-item">
                    <label>Maintenance</label>
                    <select onChange={handleChangeMaintenance}>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">Jun</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                <div className="form-item">
                    <label>Status</label>
                    <select onChange={handleChangeStatus}>
                        <option value="true">Open</option>
                        <option value="false">Close</option>
                    </select>
                </div>
                <div className="form-item">
                    <label>Handicap Access</label>
                    <select onChange={handleChangeHandicap}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
            <div className="form-line">
                <div className="form-item">
                    <label>Image</label>
                    <input onChange={handleChangeImage} type="text"/>
                </div>
            </div>
            <div className="form-line">
                <div className="form-item">
                    <label>Description</label>
                    <textarea onChange={handleChangeDescription}></textarea>
                </div>
            </div>
            <input type="submit" value="ADD"/>
        </form>
    )
}