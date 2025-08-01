import { FalconCanvas } from "@/components/Falcon/FalconCanvas";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden bg-black text-white font-mono">
      <FalconCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-0" />
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 space-y-4">
        <h1 className="font-black text-4xl md:text-6xl leading-tight">
          Your Star Wars Starship Command Center
        </h1>
        <p className="text-muted-foreground max-w-xl text-base md:text-lg">
          Search and compare iconic Star Wars starships by crew, speed, and hyperdrive rating.
        </p>

        <Link href="/dashboard">
          <Button size="lg" className="gap-2 text-lg font-semibold shadow-xl">
            Launch Dashboard
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
