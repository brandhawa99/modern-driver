

export const ImageSection = ({ image }: { image: string }) => {
  return (
    <section className="relative w-full h-[60vh] overflow-hidden mt-10 ">
      {/* Blurred background */}
      <img
        src={image}
        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60 "
      />

      {/* Foreground */}
      <div className="relative z-10 mx-auto max-w-5xl h-full flex items-center">
        <img
          src={image}
          className="w-full h-auto max-h-full object-contain"
        />
      </div>
    </section>
  )
}