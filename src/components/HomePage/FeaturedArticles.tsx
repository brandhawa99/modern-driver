import articles from "@/data/Articles";
import type { ArticleProps } from "./ArticlePopups";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import ArticlePopups from "./ArticlePopups";
import { motion } from "motion/react";

function FeaturedArticles() {
  const [open, setOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<ArticleProps | null>(null);

  const openDialog = (data: ArticleProps) => {
    setActiveDialog({ img: data.img, title: data.title, content: data.content });
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex w-full justify-center mt-20 mb-20">
        <div className="flex flex-col mt-20 w-full max-w-5xl">
          <motion.h2
            className="font-cormorant font-light text-4xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Articles
          </motion.h2>
          <div className="grid grid-cols-2 grid-rows-2 gap-2 md:gap-6 w-full">
            {articles.map((article, index) => (
              <motion.div
                className="w-full h-full"
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ArticleSection data={article} openDialog={openDialog} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <ArticlePopups
        img={activeDialog?.img}
        title={activeDialog?.title}
        content={activeDialog?.content}
      />
    </Dialog>
  );
}

export default FeaturedArticles;

const ArticleSection = ({
  data,
  openDialog,
}: {
  data: ArticleProps;
  openDialog: (data: ArticleProps) => void;
}) => {
  return (
    <div
      className="cursor-pointer relative rounded-2xl overflow-hidden max-h-150 h-full"
      onClick={() => openDialog(data)}
    >
      <img
        className="w-full h-full object-cover"
        src={`${data.img}?w=600&q=55&auto=format&fit=crop&fm=webp`}
        alt={data.title}
        crossOrigin="anonymous"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h3 className="font-cormorant font-light text-2xl md:text-4xl text-white mb-4">
          {data.title}
        </h3>
        <button
          className="text-sm text-white/70 hover:text-white transition-colors duration-300 cursor-pointer underline underline-offset-4 decoration-white/30 hover:decoration-white w-fit"
          onClick={(e) => {
            e.stopPropagation();
            openDialog(data);
          }}
        >
          Read Article
        </button>
      </div>
    </div>
  );
};