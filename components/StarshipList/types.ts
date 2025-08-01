import { Starship } from "@/components/Dashboard/types";


export interface starShipList {
    count: number;
    next: string;
    previous: string;
    results: Starship[];
}