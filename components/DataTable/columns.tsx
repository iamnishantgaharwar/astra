"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button"

export type Starship = {
  id: string
  name: string
  model: string
  manufacturer?: string
  crew: string
  hyperdrive_rating: number
}

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData, TValue> {
    mobile?: boolean;
  }
}

export const columns: ColumnDef<Starship>[] = [
  {
    accessorKey: "name",
    header: "Name",
    meta: {
      mobile: false,
    }
  },
  {
    accessorKey: "model",
    header: "Model",
    meta: {
      mobile: false,
    },
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
    meta: {
      mobile: true,
    },
  },
  {
    accessorKey: "crew",
    header: "Crew",
    meta: {
      mobile: true,
    },
  },
  {
    accessorKey: "hyperdrive_rating",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Hyperdrive Rating
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    filterFn: (row, columnId, filterValue) => {
      const rating = row.getValue<number>(columnId);
      if (filterValue === "") return true;
      if (filterValue === "<1.0") return rating < 1.0;
      if (filterValue === "1.0-2.0") return rating >= 1.0 && rating <= 2.0;
      if (filterValue === ">2.0") return rating > 2.0;
      return true;
    },
    meta: {
      mobile: true,
    },
  },
  
]