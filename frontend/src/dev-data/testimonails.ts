interface Testimonial {
  id: string | number;
  name: string;
  image: string;
  review: string;
  stars: number;
}

export const reviews: Testimonial[] = [
  {
    id: 1,
    name: "Sarah T.",
    review:
      "Absolutely in love with my purchase from EcoLife! My EcoLife 'Bamboo Bliss' kitchen set—outstanding quality, eco-friendly, reducing plastic waste. Excited to discover more from EcoLife!",
    image: "/profile1.png",
    stars: 5,
  },
  {
    id: 2,
    name: "Alex R.",
    review:
      "Just got EcoLife's 'Green Oasis' organic cotton bedsheets—super soft, sustainable, and sleep better. Highly recommend!",
    image: "/profile2.png",
    stars: 5,
  },
  {
    id: 3,
    name: "Maya G.",
    review:
      "EcoLife's 'SolarGlow' lantern: a must for outdoorsy folks! Eco-friendly, practical, and durable. Impressed with its solar efficiency. Kudos, EcoLife!",
    image: "/profile3.png",
    stars: 5,
  },
];
