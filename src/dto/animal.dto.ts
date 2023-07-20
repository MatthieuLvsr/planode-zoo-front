import { Enclosure } from "./enclosure.dto";

export interface Animal{
    _id?: string;
    name: string;
    description: string;
    image: string; // URL or path to image
    species: string; // The species of the animal e.g. "Lion"
    age: number; // total people allowed
    enclosure: string | Enclosure // Enclosure
}