import { carsData } from "@/data/cars";
import DisplayCard from "../DisplayCard/DisplayCard";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

function CarsSection() {
  return (
    <div className="w-full flex flex-col items-center mt-40 mb-40">
      <article className="flex flex-col justify-center max-w-5xl w-full">
        <motion.h1
          className="text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Cars
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
          {carsData.map((car, index) => {
            if (car.isFeatured && car.isAuction) {
              return (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DisplayCard car={car} />
                </motion.div>
              );
            }
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="self-center mt-15"
        >
          <Button asChild>
            <Link to="/showroom" className="max-w-40 text-center">
              View More Cars
            </Link>
          </Button>
        </motion.div>
      </article>
    </div>
  );
}

export default CarsSection;
