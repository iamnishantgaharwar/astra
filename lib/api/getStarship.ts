import { Starship } from "@/components/Dashboard/types";
import axios from "axios";

export const fetchStarships = async (search: string): Promise<Starship[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/starships/?search=${search}`
  );
  return res.data.results;
};
