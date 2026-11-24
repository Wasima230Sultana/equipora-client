import { Mail, MapPin, Phone } from "lucide-react"

import { BrandLogo } from "@/components/ui/brand-logo"
import { Container } from "@/components/ui/container"
import { SocialIcon, socialLinks } from "@/components/ui/social-icons"
import { footerGroups } from "@/lib/site-data"

const contact = [
  { icon: MapPin, text: "Business Bay, Dubai, United Arab Emirates" },
  { icon: Phone, text: "+971 4 555 0188" },
  { icon: Mail, text: "hello@equipora.com" },
]

export function SiteFooter() {
  return (
    <footer className="bg-brand-950 text-white">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">
          <div className="max-w-sm">
            <BrandLogo inverse />
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              The smarter way to rent and list construction equipment. Built for
              teams who value reliability, transparency and speed.
            </p>
            <ul className="mt-6 space-y-3">
              {contact.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 text-sm text-white/65"
                >
                  <Icon className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/55">
            © {new Date().getFullYear()} Equipora. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, label, href }) => (
              <a
                key={name}
                href={href}
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <SocialIcon name={name} className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
