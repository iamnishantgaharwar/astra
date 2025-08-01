import { Suspense } from 'react';
import StarshipList from "@/components/StarshipList/StarshipList"

const Home = () => {
  return (
    <main className="font-mono">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Starships</h1>
        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }>
          <StarshipList />
        </Suspense>
      </div>
    </main>
  )
}

export default Home