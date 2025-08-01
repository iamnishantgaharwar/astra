import { Starship } from "@/components/Dashboard/types";
import { starShipList } from "@/components/StarshipList/types";
import axios from "axios";

export const fetchStarships = async (search: string): Promise<Starship[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/starships/?search=${search}`
  );
  return res.data.results;
};

export const fetchStarshipList = async (page = 1): Promise<starShipList> => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/starships/?page=${page}`
    );
    return res.data;
}
