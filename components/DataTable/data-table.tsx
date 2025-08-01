"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columnFilterAtom, pageAtom, rowSelectionAtom, sortingAtom } from "@/Atoms/atom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAtom } from "jotai";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { ChevronDown } from "lucide-react";
import Modal from "../Modal/Modal";
import { Label } from "../ui/label";
import { Starship } from "./columns";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";


interface DataTableProps<TData extends Starship, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function DataTable<TData extends Starship, TValue>({
  columns,
  data,
  hasNextPage,
  hasPreviousPage,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useAtom(columnFilterAtom);
  const [sorting, setSorting] = useAtom(sortingAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [rowSelection, setRowSelection] = useAtom(rowSelectionAtom);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    getRowId: (row) => row.id,
    state: {
      columnFilters,
      sorting,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  });
  const selectedRows = table.getSelectedRowModel().rows;
  const selectedCount = table.getSelectedRowModel().rows.length;
  const selectedShips = selectedRows.map((r) => r.original);

  const isMobile = useIsMobile()
  
  useEffect(() => {
    if(isMobile){
      table.getAllColumns().forEach((col) => {
        if(col.columnDef.meta?.mobile) {
          col.toggleVisibility(false)
        } else {
          col.toggleVisibility(true)
        }
      })
    }
  }, [isMobile])

  return (
    <>
      <div className="flex items-center mt-2 space-x-2">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Select
          onValueChange={(value) => {
            table.getColumn("hyperdrive_rating")?.setFilterValue(value);
          }}
          value={
            (table
              .getColumn("hyperdrive_rating")
              ?.getFilterValue() as string) ?? ""
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Hyperdrive filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All</SelectItem>
            <SelectItem value="<1.0">&lt; 1.0</SelectItem>
            <SelectItem value="1.0-2.0">1.0 – 2.0</SelectItem>
            <SelectItem value=">2.0">&gt; 2.0</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="text-xs sm:text-base">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead>
                <Label>Select</Label>
                </TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="hover:bg-accent"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  <TableCell>
                    <Input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={row.getIsSelected()}
                      onChange={row.getToggleSelectedHandler()}
                      disabled={!row.getIsSelected() && selectedCount >= 3}
                    />
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border text-xs sm:text-base wrap-break-word">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-muted-foreground">Page {page}</div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={!hasPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasNextPage}
          >
            Next
          </Button>
        </div>
        

        {selectedCount > 1 && selectedCount <= 3 && (
          <div className="flex items-center mx-2">
            <Modal selectedShips={selectedShips}>
              <Button variant="outline" size="sm">
                Compare ({selectedCount})
              </Button>
            </Modal>
          </div>
          )}
      </div>
    </>
  );
}
