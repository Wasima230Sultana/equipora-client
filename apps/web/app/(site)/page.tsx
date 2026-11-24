import { CategoriesSection } from "@/components/sections/categories-section"
import { FeaturedEquipmentSection } from "@/components/sections/featured-equipment-section"
import { HeroSection } from "@/components/sections/hero-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { ListEquipmentCtaSection } from "@/components/sections/list-equipment-cta-section"
import { RecentlyAddedSection } from "@/components/sections/recently-added-section"
import { SearchSection } from "@/components/sections/search-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { TrustedOwnersSection } from "@/components/sections/trusted-owners-section"
import { WhyChooseSection } from "@/components/sections/why-choose-section"

/** Homepage sections are composed here; each section lives in its own component. */
export default function Page() {
  return (
    <main>
      <HeroSection />
      <SearchSection />
      <CategoriesSection />
      <FeaturedEquipmentSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <RecentlyAddedSection />
      <TrustedOwnersSection />
      <TestimonialsSection />
      <ListEquipmentCtaSection />
    </main>
  )
}
