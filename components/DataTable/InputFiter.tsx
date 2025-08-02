import { Input } from "../ui/input";

interface InputFiterProps {
  table: any;
}

const InputFiter = ({ table }: InputFiterProps) => {
  return (
    <Input
      placeholder="Filter name..."
      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("name")?.setFilterValue(event.target.value)
      }
      className="max-w-xs col-span-2"
    />
  );
};

export default InputFiter;
