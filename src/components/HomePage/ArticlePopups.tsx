import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";

export interface ArticleProps {
  img: string | undefined;
  title: string | undefined;
  content: string | undefined;
}
function ArticlePopups({ img, title, content }: ArticleProps) {
  return (
    <DialogContent className="p-0 gap-0 md:min-w-3xl rounded-2xl">
      <DialogTitle className="hidden">{title}</DialogTitle>
      <div className="max-h-150 overflow-y-auto rounded-2xl">
        <img
          className="w-full rounded-2xl rounded-b-none pb-0 mb-0 h-100 object-cover"
          src={img}
        />

        <div className="p-6 flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{title}</h1>
          <div className="text-xl">
            {content?.split("\n\n").map((para, i) => (
              <p key={i} className="font-2xl">
                {para}
              </p>
            ))}
          </div>
          <div className="w-full flex justify-end underline">
            Author: ChatGPT
          </div>
        </div>
      </div>
      <DialogDescription>
        Detailed view of the selected article.
      </DialogDescription>
    </DialogContent>
  );
}

export default ArticlePopups;
