import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Mockup } from "@/components/ui/mockup"
import { Glow } from "@/components/ui/glow"
import { Icons } from "@/components/ui/icons"

interface HeroWithMockupProps {
  title: string
  description: string
  primaryCta?: {
    text: string
    href?: string
    onClick?: () => void
  }
  secondaryCta?: {
    text: string
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
  }
  mockupImage: {
    src: string
    alt: string
    width: number
    height: number
  }
  className?: string
}

export function HeroWithMockup({
  title,
  description,
  primaryCta = {
    text: "Get Started",
    href: "/get-started",
  },
  secondaryCta = {
    text: "GitHub",
    href: "https://github.com/your-repo",
    icon: <Icons.gitHub className="mr-2 h-4 w-4" />,
  },
  mockupImage,
  className,
}: HeroWithMockupProps) {
  return (
    <section
      className={cn(
        "relative bg-slate-100 text-foreground",
        "py-20 px-4 md:py-24 lg:py-[150px]",
        "overflow-hidden",
        className,
      )}
    >
      <div className="relative mx-auto max-w-[1280px] flex flex-col gap-8 sm:gap-12 lg:gap-24">
        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 pt-8 md:pt-16 text-center lg:gap-12">
          {/* Heading */}
          <h1
            className={cn(
              "inline-block",
              "text-slate-900",
              "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
              "leading-[1.1] sm:leading-[1.1]",
              "drop-shadow-sm",
            )}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={cn(
              "max-w-[320px] sm:max-w-[450px] md:max-w-[550px]",
              "text-sm sm:text-base md:text-lg lg:text-xl",
              "text-slate-600",
              "font-medium",
              "px-4 sm:px-0",
            )}
          >
            {description}
          </p>

          {/* CTAs */}
          <div
            className="relative z-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none"
          >
            <Button
              asChild={!!primaryCta.href}
              size="lg"
              className={cn(
                "bg-brand-main hover:bg-brand-main/80",
                "text-white shadow-lg",
                "transition-all duration-300",
              )}
              onClick={primaryCta.onClick}
            >
              {primaryCta.href ? (
                <a href={primaryCta.href}>{primaryCta.text}</a>
              ) : (
                <span>{primaryCta.text}</span>
              )}
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className={cn(
                "text-slate-700",
                "transition-all duration-300",
              )}
            >
              <a href={secondaryCta.href}>
                {secondaryCta.icon}
                {secondaryCta.text}
              </a>
            </Button>
          </div>

          {/* Mockup */}
          <div className="relative w-full pt-12 sm:pt-12 px-4 sm:px-6 lg:px-8">
            <Mockup
              className={cn(
                "shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)]",
                "border-brand/10",
              )}
            >
              <img
                {...mockupImage}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </Mockup>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow
          variant="above"
        />
      </div>
    </section>
  )
}
