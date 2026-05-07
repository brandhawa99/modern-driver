import { Dialog, DialogTrigger } from "../ui/dialog";
import ArticlePopups from "./ArticlePopups";
import { mainArticle } from "@/data/Articles";

function Hero() {
  const { img, title, content } = mainArticle;

  return (
    <Dialog>
      <div className="relative w-full h-[90vh] min-h-150 overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1596450886763-6f9b7f3cbd0a?w=1400&q=75&auto=format&fit=crop&fm=webp"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Porsche 918 Spyder"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 md:px-16 md:pb-16 max-w-5xl">
          <span className="inline-block text-xs font-light tracking-widest uppercase text-white/60 border border-white/20 px-3 py-1 rounded-full mb-6">
            Trending Article
          </span>

          <h1 className="font-cormorant font-light text-4xl md:text-5xl text-white leading-tight max-w-2xl mb-6">
            Inside the Porsche 918 Spyder: Where Performance Meets Hybrid
            Innovation.
          </h1>

          <DialogTrigger asChild>
            <button className="text-sm text-white/70 hover:text-white transition-colors duration-300 cursor-pointer underline underline-offset-4 decoration-white/30 hover:decoration-white">
              Read Article
            </button>
          </DialogTrigger>
        </div>
      </div>

      <ArticlePopups img={img} title={title} content={content} />
    </Dialog>
  );
}

export default Hero;
