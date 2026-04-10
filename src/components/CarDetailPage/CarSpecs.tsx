function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-4 border-b border-border last:border-0">
      <span className="text-xs tracking-widest uppercase text-muted-foreground font-sans">
        {label}
      </span>
      <span className="font-heading text-base text-foreground">{value}</span>
    </div>
  );
}

export const CarSpecs = ({ specs }: { specs: [string, string][] }) => {
  return (
    <section className="py-12">
      <h3 className=" tracking-widest uppercase text-muted-foreground font-sans mb-6">
        Specification
      </h3>
      <div>
        {specs.map(([label, value]) => (
          <SpecRow key={label} label={label} value={value} />
        ))}
      </div>
    </section>
  )
} 