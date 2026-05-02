import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export const ImageSection = ({ image }: { image: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative w-full h-[60vh] overflow-hidden mt-10">
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <img
        src={image}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
      />
      <div className="relative z-10 mx-auto max-w-5xl h-full flex items-center">
        <img
          src={image}
          fetchPriority="high"
          onLoad={() => setLoaded(true)}
          className={cn(
            "w-full h-auto max-h-full object-contain transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    </section>
  );
};
