import { Button } from "../ui/button";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ArticlePopups from "./ArticlePopups";
import { mainArticle } from "@/data/Articles";

function Hero() {
  const { img, title, content } = mainArticle;

  return (
    <Dialog>
      <div className="relative w-full h-[90vh] min-h-150 overflow-hidden rounded-2xl">
        <div className="max-w-5xl ">
          <img
            src="https://images.unsplash.com/photo-1596450886763-6f9b7f3cbd0a?q=80&w=1920&auto=format&fit=crop"
            className="rounded-2xl absolute inset-0 w-full h-full object-cover"
            alt="Porsche 918 Spyder"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 md:px-16 md:pb-16 max-w-5xl">
            {/* Badge */}
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-white/60 border border-white/20 px-3 py-1 rounded-full mb-6">
              Trending Article
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl mb-4">
              Inside the Porsche 918 Spyder: Where Performance Meets Hybrid
              Innovation.
            </h1>

            {/* <p className="text-white/70 max-w-xl text-sm md:text-base leading-relaxed mb-8">
            The Porsche 918 Spyder stands as one of the most ambitious
            engineering feats of the modern automotive era, seamlessly blending
            cutting-edge hybrid technology with the raw performance expected of
            a flagship supercar.
          </p> */}

            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="group bg-transparent border-white/30 text-white hover:bg-white transition-all duration-300 cursor-pointer"
              >
                Read Article
                <ArrowRightIcon className="transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </Button>
            </DialogTrigger>
          </div>
        </div>
      </div>

      <ArticlePopups img={img} title={title} content={content} />
    </Dialog>
  );
}

export default Hero;
