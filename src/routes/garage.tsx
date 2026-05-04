import { GarageValuation } from "@/components/Garage/GarageValuation";
import { Button } from "@/components/ui/button";
import { carsData } from "@/data/cars";
import { useGarageStore } from "@/store/garageStore";
import { createFileRoute, Link } from "@tanstack/react-router";
import Garage from "@/assets/Garage.gif";
import DisplayCard from "@/components/DisplayCard/DisplayCard";
import { AnimatePresence, motion } from "motion/react"

export const Route = createFileRoute("/garage")({
  component: RouteComponent,
});

function RouteComponent() {
  const garageIds = useGarageStore((state) => state.garageIds);
  const garageCars = carsData.filter((c) => garageIds[c.id]);

  // const avgValue = totalValue / garageCars.length
  return (
    <div className="w-full min-h-[calc(100vh-80px)]">
      {garageCars.length <= 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-80px)] px-2 text-balance">
          <div className="bg-primary/70 p-10 rounded my-10 flex items-center justify-center">
            <img src={Garage} />
          </div>
          <h1 className="font-bold text-center">Your Collection is currently empty.</h1>
          <p className="max-w-md dark:text-gray-400 text-center">
            Start exploring our curated collection to discover rare automotive
            masterpieces and begin your collection!
          </p>
          <Button asChild>
            <Link to="/showroom">Add Cars</Link>
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-8xl mx-auto px-8 md:px-15 lg:px-20 xl:px-40">
          <GarageValuation cars={garageCars} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>

              {garageCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  layout
                  layoutId={`car-${car.id}`}
                  initial={false}
                  exit={{ opacity: 0, scale: 0.94, filter: "blur(4px)" }}
                  transition={{
                    layout: { type: "spring", stiffness: 400, damping: 40 },
                    opacity: { duration: 0.2, ease: "easeOut" },
                    scale: { duration: 0.25, ease: [0.32, 0, 0.67, 0] },
                    filter: { duration: 0.2 },
                  }}
                >
                  <DisplayCard car={car} key={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
