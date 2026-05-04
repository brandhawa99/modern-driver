import { cn } from "@/lib/utils";

export const ImageSection = ({ image }: { image: string }) => {

  return (
    <section className="relative w-full h-[60vh] overflow-hidden mt-10">
      <img
        src={image}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
      />
      <div className="relative z-10 mx-auto max-w-5xl h-full flex items-center">
        <img
          src={image}
          fetchPriority="high"
          className={cn(
            "w-full h-auto max-h-full object-contain transition-opacity duration-500 ",
          )}
        />
      </div>
    </section>
  );
};
