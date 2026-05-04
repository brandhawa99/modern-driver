import { Button } from "../ui/button";
import articles from "@/data/Articles";
import type { ArticleProps } from "./ArticlePopups";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import ArticlePopups from "./ArticlePopups";

function FeaturedArticles() {
  const [open, setOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<ArticleProps | null>(null);

  const openDialog = (data: ArticleProps) => {
    setActiveDialog({
      img: data.img,
      title: data.title,
      content: data.content,
    });
    setOpen(true);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex w-full justify-center">
        <div className="flex flex-col mt-20 w-full max-w-5xl">
          <h1 className="text-4xl font-bold">Featured Articles</h1>
          <div className="grid grid-cols-2 grid-rows-2 gap-2 md:gap-6 w-full mt-10">
            {
              articles.map((article) => {
                return (
                  <ArticleSection data={article} openDialog={openDialog} key={article.title} />
                )
              })
            }
          </div>
        </div>
      </div>
      <ArticlePopups
        img={activeDialog?.img}
        title={activeDialog?.title}
        content={activeDialog?.content}
      />
    </Dialog >
  );
}

export default FeaturedArticles;

const ArticleSection = ({ data, openDialog }: { data: ArticleProps, openDialog: (data: ArticleProps) => void }) => {

  return (
    <div
      className="cursor-pointer relative rounded-2xl overflow-hidden max-h-150"
      onClick={() => {
        openDialog(data);
      }}>

      <img className="w-full h-full object-cover" src={data.img} />
      <div className="flex items-center md:items-end p-6 md:py-20 absolute inset-0 text-black bg-linear-to-t from-black to-transparent">
        <h1 className="text-pretty font-bold text-2xl md:text-5xl text-white">
          {data.title}

        </h1>
        <Button
          variant={"secondary"}
          className="absolute bottom-2 right-2 md:bottom-4 mdd:bottom-4"
          onClick={(e) => {
            e.stopPropagation();
            openDialog(data);
          }}
        >
          Read Article
        </Button>
      </div>
    </div>
  )
}
