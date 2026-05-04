import { useRouter } from "@tanstack/react-router";
import { ArrowLeftIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function CarDetailPageError() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[calc(100vh-80px)] px-6 text-center">
      <WarningCircleIcon
        size={48}
        weight="thin"
        className="text-muted-foreground"
      />

      <div className="flex flex-col gap-2">
        <h1 className="font-heading font-light text-4xl md:text-5xl tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="text-sm tracking-widest uppercase text-muted-foreground font-sans">
          This listing could not be loaded
        </p>
      </div>

      <Button
        variant="secondary"
        className="uppercase text-sm font-sans tracking-widest px-8 py-3 cursor-pointer"
        onClick={() => router.history.back()}
      >
        <ArrowLeftIcon size={16} />
        Go back
      </Button>
    </div>
  );
}
