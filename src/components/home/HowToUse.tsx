import { SectionHeading } from '@/components/ui/SectionHeading'

interface HowToUseProps {
  eyebrow: string
  title: string
  lead: string
  steps: { number: string; title: string; description: string }[]
}

export function HowToUse({ eyebrow, title, lead, steps }: HowToUseProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} align="center" />

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <article
            key={step.number}
            className="fade-up relative border border-[var(--rule)] bg-[var(--bg)] p-7"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-gold-500)]">
              Step {step.number}
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold leading-snug">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{step.description}</p>
            <span aria-hidden className="absolute right-6 top-6 font-heading text-5xl text-[var(--color-gold-500)]/15">
              {step.number}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
