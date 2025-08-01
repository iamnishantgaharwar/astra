"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  name: string
  model: string
  manufacturer: string
  crewSize: number
  hyperdriveRating: number
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
  },
  {
    accessorKey: "crewSize",
    header: "Crew Size",
  },
  {
    accessorKey: "hyperdriveRating",
    header: "Hyperdrive Rating",
  },
]