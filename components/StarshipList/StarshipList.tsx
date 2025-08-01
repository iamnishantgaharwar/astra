"use client";

import { pageAtom } from "@/Atoms/atom";
import { fetchStarshipList } from "@/lib/api/getStarship";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { columns, Starship as TableStarship } from "../DataTable/columns";
import { DataTable } from "../DataTable/data-table";
import StarshipSkeleton from "./StarshipSkeleton";

const StarshipList = () => {
  const [currentPage, setCurrentPage] = useAtom(pageAtom);
  const pageUrl = useSearchParams().get("page");
  const router = useRouter();

  const {
    data: starshipList,
    isLoading: loadingList,
    isError,
  } = useQuery({
    queryKey: ["starshipList", currentPage],
    queryFn: () => fetchStarshipList(currentPage),
    enabled: !!currentPage,
  });

  useEffect(() => {
    router.replace(`?page=${currentPage}`);
  }, [currentPage, router]);

  useEffect(() => {
    if (pageUrl) {
      setCurrentPage(parseInt(pageUrl));
    }
  }, [pageUrl, setCurrentPage]);

  if (loadingList) return (
    <StarshipSkeleton />
  );
  if (isError) return <div>Error: {isError}</div>;
  if (!starshipList) return <div>No data available</div>;

  // Transform the API data to match the TableStarship type
  const tableData: TableStarship[] = starshipList.results.map(
    (starship, index) => ({
      id: ((currentPage - 1) * 10 + index + 1).toString(), // Calculate ID based on page and index
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      crew: starship.crew, // Handle non-numeric characters
      hyperdrive_rating: parseFloat(starship.hyperdrive_rating) || 0,
    })
  );

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={tableData}
        hasNextPage={!!starshipList.next}
        hasPreviousPage={!!starshipList.previous}
      />
    </div>
  );
};

export default StarshipList;
