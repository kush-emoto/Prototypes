export type Market = "IN" | "ES";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  range: string;
  topSpeed: string;
  motor: string;
  color: string;
  image: string;
  banner: string;
  badge?: string;
  description: string;
};

export type HomeContent = {
  market: Market;
  announcement: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    mediaUrl: string;
    mediaType: "image" | "video";
  };
  intro: { title: string; body: string };
  benefitsTitle: string;
  reviewsTitle: string;
  enabledSections: Record<"products" | "intro" | "benefits" | "reviews" | "newsletter", boolean>;
  updatedAt: string;
};

export interface ContentRepository {
  getHome(market: Market): Promise<HomeContent>;
  saveHome(content: HomeContent): Promise<void>;
}
