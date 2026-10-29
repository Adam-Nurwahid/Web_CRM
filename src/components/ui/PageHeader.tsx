interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  meta,
}: PageHeaderProps) {
  return (
    <header className="fade-up flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <span className="h-1 w-1 rounded-full bg-accent shadow-[0_0_10px_rgba(224,138,104,0.9)]" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h1 className="mt-2.5 font-display text-[36px] leading-[1.02] tracking-[-0.015em] text-ink sm:text-[42px]">
          {title}
        </h1>
        <p className="mt-2.5 max-w-3xl text-[13px] leading-relaxed text-muted sm:text-[13.5px]">
          {description}
        </p>
        {meta && <div className="mt-4 flex flex-wrap items-center gap-2">{meta}</div>}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          {actions}
        </div>
      )}
    </header>
  );
}
