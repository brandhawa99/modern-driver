import { cn } from "@/lib/utils";
import { useState } from "react";

const PLACEHOLDER = "/carPlaceholder.webp";

export const ImageSection = ({ image }: { image: string }) => {
  const [failed, setFailed] = useState(false);
  return (
    <section className="relative w-full h-[60vh] overflow-hidden mt-10">
      <img
        src={failed ? PLACEHOLDER : `${image}?w=200&auto=format&q=75`}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
        crossOrigin="anonymous"
        onError={() => {
          setFailed(true);
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl h-full flex items-center">
        <img
          src={failed ? PLACEHOLDER : `${image}?w=800&auto=format&q=75`}
          fetchPriority="high"
          className={cn(
            "w-full h-auto max-h-full object-contain transition-opacity duration-500",
          )}
          crossOrigin="anonymous"
          onError={() => {
            setFailed(true);
          }}
        />
      </div>
    </section>
  );
};
