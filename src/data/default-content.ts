import type { HomeContent, Market } from "@/lib/types";

const india: HomeContent = {
  market: "IN",
  announcement: "Free shipping across India · Easy EMI available",
  hero: {
    eyebrow: "Built for everyday adventure",
    title: "Move different.",
    subtitle: "Electric cycles designed in India for commutes, trails and everything in between.",
    ctaLabel: "Explore e-bikes",
    ctaHref: "/bikes",
    mediaUrl: "/ranger.mp4",
    mediaType: "video",
  },
  intro: {
    title: "The ride changes everything",
    body: "From the morning commute to the long way home, EMotorad makes every kilometre feel lighter.",
  },
  benefitsTitle: "Everything you need to ride electric",
  reviewsTitle: "Real riders. Real stories.",
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
