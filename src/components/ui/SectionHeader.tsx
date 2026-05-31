type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
};

export function SectionHeader({ eyebrow, title, intro }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-800">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-7 text-slate-600">{intro}</p>
      ) : null}
    </div>
  );
}
