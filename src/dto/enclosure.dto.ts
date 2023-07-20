import { Animal } from "./animal.dto";

export interface Enclosure {
    _id?: string;
    name: string;
    description: string;
    image: string; // URL or path to image
    type: string; // e.g. "petting zoo", "aquarium", "aviary", "reptile house"
    capacity: number; // total people allowed
    openingHours: string; // "09:00-17:00"
    duration: number; // how long somoene can stay in this space, in minutes (e.g. 30 minutes)
    status: boolean; // true if enclosure is closed for maintenance (no visitors allowed)
    bestMaintenanceMonth?: number; // 1-12
    handicapAccessible: boolean;
    animals: string[]|Animal[]
}