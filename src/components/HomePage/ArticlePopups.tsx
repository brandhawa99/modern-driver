import { DialogContent } from '../ui/dialog'

export interface ArticleProps {
  img: string | undefined
  title: string | undefined;
  content: string | undefined;

}
function ArticlePopups({ img, title, content }: ArticleProps) {
  return (
    <DialogContent className='p-0 gap-0 md:min-w-3xl rounded-2xl'>
      <div className='max-h-150 overflow-y-auto rounded-2xl'>
        <img className="w-full rounded-2xl rounded-b-none pb-0 mb-0 h-100 object-cover" src={img} />

        <div className='p-6 flex flex-col gap-4'>
          <h1 className="text-2xl font-bold">
            {title}
          </h1>
          {content?.split("\n\n").map((para, i) => (
            <p key={i} className="mb-[0.5px]">
              {para}
            </p>
          ))}
          Author: ChatGPT
        </div>
      </div>

    </DialogContent>
  )
}

export default ArticlePopups