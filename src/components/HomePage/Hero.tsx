import { Button } from "../ui/button";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ArticlePopups from "./ArticlePopups";
import articles from "@/data/Articles";

function Hero() {
  const { img, title, content } = articles.porsche918;
  return (
    <Dialog>
      <div className="w-full flex justify-center">
        <article className="flex flex-col gap-4 mt-20 max-w-5xl relative">
          <div className="absolute -top-7.5">Trending Article</div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-2">
            <h1 className="flex-1 text-5xl font-bold">
              Inside the Porsche 918 Spyder: Where Performance Meets Hybrid
              Innovation.
            </h1>
            <p className="flex-1 flex flex-col">
              The Porsche 918 Spyder stands as one of the most ambitiofus
              engineering feats of the modern automotive era, seamlessly
              blending cutting-edge hybrid technology with the raw performance
              expected of a flagship supercar. Developed not just to compete,
              but to redefine what was possible, the 918 pairs a naturally
              aspirated V8 with advanced electric motors to deliver both
              staggering speed and surprising efficiency. More than a showcase
              of power, it represents a turning point—where sustainability and
              performance are no longer opposing forces, but integral parts of
              the same machine.
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-default self-end group cursor-pointer"
                >
                  read more
                  <ArrowRightIcon className="ease-in-out transition group-hover:translate-x-1" />
                </Button>
              </DialogTrigger>
            </p>
          </div>
          <img
            className="w-full rounded-2xl"
            src="https://images.unsplash.com/photo-1596450886763-6f9b7f3cbd0a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </article>
      </div>
      <ArticlePopups img={img} title={title} content={content} />
    </Dialog>
  );
}

export default Hero;
