import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";

export interface ArticleProps {
  img: string | undefined;
  title: string | undefined;
  content: string | undefined;
}

function ArticlePopups({ img, title, content }: ArticleProps) {
  return (
    <DialogContent className="p-0 gap-0 md:min-w-3xl rounded-2xl overflow-hidden border-white/10">
      <DialogTitle className="hidden">{title}</DialogTitle>
      <DialogDescription className="hidden">
        Detailed view of the selected article.
      </DialogDescription>

      <div className="max overflow-y-auto">
        {/* Hero image with gradient overlay */}
        <div className="relative h-72 md:h-96 w-full">
          <img className="w-full h-full object-cover" src={img} alt={title} />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

          {/* Title pinned over image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-white/60 border border-white/20 px-3 py-1 rounded-full mb-4">
              Featured
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Body */}
        <div className="bg-background p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {content?.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-foreground/80"
              >
                {para}
              </p>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs tracking-widest uppercase text-foreground/40">
              Modern Driver
            </span>
            <span className="text-xs text-foreground/40">
              Written by ChatGPT
            </span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ArticlePopups;
