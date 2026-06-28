import type { HomeContent, Market } from "@/lib/types";

const india: HomeContent = {
  market: "IN",
  announcement: "Free shipping across India · Easy EMI available",
  hero: {
    eyebrow: "India's electric mobility revolution",
    title: "We're pioneering India's electric mobility revolution.",
    subtitle: "Because the future of transportation should be clean, efficient, and accessible to everyone.",
    ctaLabel: "Explore all models",
    ctaHref: "/bikes",
    mediaUrl: "/homepage-hero.mp4",
    mediaType: "video",
  },
  intro: {
    title: "We make electric cycles in India for real India.",
    body: "EMotorad didn’t start in a boardroom. It started in traffic, watching fuel prices rise and wondering why daily travel had to be so difficult. We built electric cycles for real city roads, real weather, and real budgets. No compromises. No surprises.",
  },
  benefitsTitle: "The E Motorad advantage",
  reviewsTitle: "Real people. Real lives. Real impact.",
  enabledSections: { products: true, intro: true, benefits: true, reviews: true, newsletter: true },
  updatedAt: new Date(0).toISOString(),
};

const spain: HomeContent = {
  ...india,
  market: "ES",
  announcement: "Envío gratuito en España · Financiación disponible",
  hero: {
    ...india.hero,
    title: "Muévete diferente.",
    subtitle: "Bicicletas eléctricas para la ciudad, los senderos y todo lo que hay entre ambos.",
    ctaLabel: "Ver bicicletas",
  },
  intro: {
    title: "Cada trayecto cambia",
    body: "Del viaje diario al camino más largo de vuelta a casa, cada kilómetro se siente más ligero.",
  },
};

export const defaultContent: Record<Market, HomeContent> = { IN: india, ES: spain };
