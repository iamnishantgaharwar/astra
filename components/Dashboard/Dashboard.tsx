"use client"
import { useAtom } from "jotai";
import { searchAtom } from "@/Atoms/atom";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchStarships } from "@/lib/api/getStarship";
import { Pilot, Starship } from "@/components/Dashboard/types";


const Dashboard = () => {
    const [search, setSearch] = useAtom(searchAtom);
    const searchParams = useSearchParams().get("search");
    const router = useRouter();
  


    useEffect(() => {
      router.replace(`?search=${search}`);
    }, [searchParams, router, search])
  
    const debouncedSearch = useDebounce(search);
  
    const {
      data: starships,
      isLoading: loadingShips,
      isError,
    } = useQuery({
      queryKey: ["starships", debouncedSearch],
      queryFn: () => fetchStarships(debouncedSearch),
      enabled: !!debouncedSearch,
    });
  
    const selectedStarship = starships?.[0] as Starship; 
  
    const pilotQueries = useQueries({
      queries:
        selectedStarship?.pilots.map((url: string) => ({
          queryKey: ["pilot", url],
          queryFn: () => axios.get(url).then((res) => res.data as Pilot),
          enabled: !!selectedStarship,
        })) || [],
    });
  
    const allPilotsLoaded = pilotQueries.every((q) => q.isSuccess);
    const pilotNames = pilotQueries.map((q) => q.data?.name).filter(Boolean);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
    };
  
    return (
      <div className="py-6 space-y-6">  
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              router.replace(`?search=${encodeURIComponent(value)}`);
            }}
            placeholder="Enter starship name..."
            className="max-w-sm"
          />
        </form>
  
        {starships?.length === 0 && (
          <p className="text-red-500 font-semibold text-lg">No starships found.</p>
        )}
  
        {loadingShips && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin" size={18} /> Loading Starship...
          </div>
        )}
  
        {isError && <p className="text-red-500">Failed to fetch starships.</p>}
  
        {selectedStarship && (
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>{selectedStarship.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedStarship.model}
              </p>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              {!allPilotsLoaded ? (
                <div className="col-span-2">
                  <Loader2 className="animate-spin" size={18} /> Loading
                  Starship...
                </div>
              ) : (
                <>
                  <div>
                    <strong>Class:</strong> {selectedStarship.starship_class}
                  </div>
                  <div>
                    <strong>Cost:</strong> {selectedStarship.cost_in_credits}
                  </div>
                  <div>
                    <strong>Length:</strong> {selectedStarship.length}
                  </div>
                  <div>
                    <strong>Speed:</strong>{" "}
                    {selectedStarship.max_atmosphering_speed}
                  </div>
                  <div>
                    <strong>Crew:</strong> {selectedStarship.crew}
                  </div>
                  <div>
                    <strong>Passengers:</strong> {selectedStarship.passengers}
                  </div>
                  <div>
                    <strong>Cargo:</strong> {selectedStarship.cargo_capacity}
                  </div>
                  <div>
                    <strong>Consumables:</strong> {selectedStarship.consumables}
                  </div>
                  <div>
                    <strong>Hyperdrive:</strong>{" "}
                    {selectedStarship.hyperdrive_rating}
                  </div>
                  <div>
                    <strong>MGLT:</strong> {selectedStarship.MGLT}
                  </div>
                  <div className="col-span-2">
                    <strong>Pilots:</strong>{" "}
                    {pilotQueries.length === 0 ? (
                      "N/A"
                    ) : !allPilotsLoaded ? (
                      <span className="text-muted-foreground">
                        Loading pilots...
                      </span>
                    ) : (
                      pilotNames.join(", ")
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
}

export default Dashboard