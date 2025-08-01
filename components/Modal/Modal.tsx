// import { Starship } from "@/components/Dashboard/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import React from "react";
import { Starship } from "../DataTable/columns";

interface ModalProps<TData extends { id: string }> {
  selectedShips: TData[];
  children: React.ReactNode;
}

const Modal = ({ selectedShips, children }: ModalProps<Starship>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Starship Comparison</DialogTitle>

            {selectedShips.length > 1 && selectedShips.length <= 3 && (
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border text-sm text-left">
                  <thead>
                    <tr>
                      <th className="border p-2">Property</th>
                      {selectedShips.map((ship) => (
                        <th key={ship.id} className="border p-2">
                          {ship.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Model", key: "model" },
                      { label: "Manufacturer", key: "manufacturer" },
                      { label: "Crew", key: "crew" },
                      { label: "Hyperdrive", key: "hyperdrive_rating" },
                    ].map((prop) => (
                      <tr key={prop.key}>
                        <td className="border p-2 font-medium">{prop.label}</td>
                        {selectedShips.map((ship) => (
                          <td key={ship.id} className="border p-2">
                            {ship[prop.key as keyof Starship] ?? "N/A"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
