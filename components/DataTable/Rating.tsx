import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface RatingProps {
  table: any;
}

const Rating = ({ table }: RatingProps) => {
  return (
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
          <SelectTrigger className="sm:w-[200px]">
            <SelectValue placeholder="Hyperdrive filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All</SelectItem>
            <SelectItem value="<1.0">&lt; 1.0</SelectItem>
            <SelectItem value="1.0-2.0">1.0 – 2.0</SelectItem>
            <SelectItem value=">2.0">&gt; 2.0</SelectItem>
          </SelectContent>
        </Select>
  )
}

export default Rating