import Dashboard from "@/components/Dashboard/Dashboard";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <main className="p-6 font-mono h-5/6  flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold text-center ">Search Starship</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </main>
  );
};

export default DashboardPage;
