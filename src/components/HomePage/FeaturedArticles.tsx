import { Button } from "../ui/button"
import articles from "@/data/Articles"
import type { ArticleProps } from "./ArticlePopups"
import { useState } from "react"
import { Dialog } from "../ui/dialog"
import ArticlePopups from "./ArticlePopups"

const imgSrc = [
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1654442595448-bbb4d689f9f6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]
function FeaturedArticles() {
  const [open, setOpen] = useState(false)
  const [activeDialog, setActiveDialog] = useState<ArticleProps | null>(null)

  const openDialog = (data: ArticleProps) => {
    setActiveDialog({
      img: data.img,
      title: data.title,
      content: data.content
    })
    setOpen(true)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <div className="flex w-full justify-center">
        <div className="flex flex-col justify-center mt-20 max-w-5xl">
          <h1 className="text-4xl font-bold">Featured Articles</h1>
          <div className="grid grid-cols-12 auto-rows-[160px] gap-4 w-full mt-10">
            <div className="col-span-12 relative row-span-1 md:col-span-8 md:row-span-2 rounded-2xl bg-accent p-6 flex flex-col justify-center items-center">
              <h1 className="font-bold text-3xl text-center">
                The Art of Speed: Where Design Meets Performance
              </h1>
              <Button variant={"secondary"} className="absolute bottom-2 right-2"
                onClick={() => {
                  openDialog(articles.artOfSpeed)
                }}
              >
                Read Article
              </Button>
            </div>

            <div className="relative col-span-12 row-span-1 md:col-span-4 md:row-span-3 rounded-2xl overflow-hidden">
              <img className="w-full h-full object-cover" src={imgSrc[0]} />
              <div className=" p-6 absolute inset-0 items-center text-black bg-linear-to-b from-white to-transparent">
                <h1 className="font-bold text-center md:text-left text-5xl ">
                  Electric vs. Gas: The Shift
                </h1>
                <Button variant={"secondary"} className="absolute bottom-2 right-2"
                  onClick={() => {
                    openDialog(articles.electricVsGas)
                  }}
                >
                  Read Article
                </Button>
              </div>
            </div>

            <div className="relative col-span-12 row-span-1 md:col-span-4 md:row-span-2 rounded-2xl overflow-hidden">
              <img className="w-full h-full object-cover" src={imgSrc[1]} />
              <div className="absolute flex inset-0 p-4 bg-linear-to-b text-black from-white to-transparent">
                <h1 className="text-4xl text-center font-bold">
                  The Ferrari 488 Pista Price Surge Explained
                </h1>
                <Button variant={"secondary"} className="absolute bottom-2 right-2"
                  onClick={() => {
                    openDialog(articles.ferrari488)
                  }}
                >
                  Read Article
                </Button>
              </div>
            </div>

            <div className="relative col-span-12 row-span-1 md:col-span-4 md:row-span-2 bg-secondary rounded-2xl p-6 flex flex-col justify-center gap-2">
              <div className="absolute inset-0 flex items-center p-4 justify-center">
                <h1>
                  Inside the Ultimate Build: Engineering Without Limits
                </h1>
                <Button variant={"secondary"} className="absolute bottom-2 right-2"
                  onClick={() => {
                    openDialog(articles.ultimateBuild)
                  }}
                >
                  Read Article
                </Button>
              </div>
            </div>

            <div className="col-span-12 row-span-1 md:col-span-4 rounded-2xl bg-primary flex flex-col justify-center items-center text-center p-6">
              <h1 className="font-bold tracking-wide ">Modern Driver.</h1>
            </div>
          </div>
        </div>
      </div>
      <ArticlePopups img={activeDialog?.img} title={activeDialog?.title} content={activeDialog?.content} />
    </Dialog>
  )
}

export default FeaturedArticles