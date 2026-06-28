import type { Product } from "@/lib/types";

const root = "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24";

export const products: Product[] = [
  {
    slug: "x1",
    name: "X1",
    category: "City",
    price: 24999,
    compareAt: 32999,
    range: "40+ km",
    topSpeed: "25 km/h",
    motor: "250W",
    color: "Electric Blue",
    badge: "Everyday favourite",
    image: `${root}/productpage/x1/product+images/bluedimension.png`,
    banner: `${root}/productpage/x1/breakers/X1+Web+Banner+1.jpg`,
    description: "A nimble electric cycle designed to make everyday city rides simpler.",
  },
  {
    slug: "doodle-pro",
    name: "Doodle Pro",
    category: "Fat tyre",
    price: 52999,
    compareAt: 64999,
    range: "60+ km",
    topSpeed: "25 km/h",
    motor: "250W",
    color: "Graphite",
    badge: "Best seller",
    image: `${root}/productpage/doodle-pro/doodle%2BV3%2Bnoc%2Bdimension+1.png`,
    banner: `${root}/productpage/doodle-pro/Doodle%2BWeb%2BBanner%2B1.jpg`,
    description: "A foldable fat-tyre e-bike built for weekday commutes and weekend detours.",
  },
  {
    slug: "t-rex-plus",
    name: "T-Rex+",
    category: "MTB",
    price: 44999,
    compareAt: 55999,
    range: "50+ km",
    topSpeed: "25 km/h",
    motor: "250W",
    color: "Olive",
    badge: "Trail ready",
    image: `${root}/productpage/t-rex%2B+v3/T-REX+%2B+olive+dimension.png`,
    banner: `${root}/productpage/t-rex%2B+v3/breaker+images/breaker1.jpg`,
    description: "Confident geometry and electric assistance for roads that do not stay smooth.",
  },
  {
    slug: "st-x",
    name: "ST-X",
    category: "Step-through",
    price: 33999,
    compareAt: 42999,
    range: "45+ km",
    topSpeed: "25 km/h",
    motor: "250W",
    color: "Sand",
    image: `${root}/productpage/STX/STX_dimension+Beige.png`,
    banner: `${root}/productpage/STX/Banner1.jpg`,
    description: "An accessible step-through frame for calm, comfortable urban mobility.",
  },
];

export const formatPrice = (value: number, market = "IN") =>
  new Intl.NumberFormat(market === "IN" ? "en-IN" : "es-ES", {
    style: "currency",
    currency: market === "IN" ? "INR" : "EUR",
    maximumFractionDigits: 0,
  }).format(market === "IN" ? value : Math.round(value / 91));
