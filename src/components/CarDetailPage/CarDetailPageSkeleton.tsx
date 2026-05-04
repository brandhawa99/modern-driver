import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function CarDetailPageSkeleton() {
  return (
    <article className="min-h-screen bg-background text-foreground">
      {/* Hero image */}
      <Skeleton className="w-full h-[60vh] rounded-none" />

      <div className="max-w-3xl mx-auto px-6 md:px-0 pb-32">
        <div className="pt-14 pb-12">
          <div className="flex flex-wrap gap-2 mb-8 items-center justify-between">
            <Skeleton className="h-8 w-20 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>

          <Skeleton className="h-10 w-48 rounded-md mb-6" />

          <Skeleton className="h-14 w-64 rounded-md mb-3" />
          <Skeleton className="h-14 w-48 rounded-md" />

          <div className="flex items-center justify-between mt-8">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-36 rounded" />
          </div>
        </div>

        <Separator />

        <section className="py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-14 w-52" />
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Skeleton className="h-11 w-full md:w-40" />
            <Skeleton className="h-11 w-full md:w-40" />
          </div>
        </section>

        <Separator />

        <div className="py-12 grid grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </div>

        <Separator />

        <div className="pt-10 flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </article>
  );
}