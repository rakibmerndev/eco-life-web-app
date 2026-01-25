export interface ProductProps {
  id: string | number;
  name: string;
  discountedPrice: number;
  price: number;
  image: string;
  reviewsNumber: number;
}

export const Products: ProductProps[] = [
  {
    id: 1,
    name: "Bamboo Toothbrush Set",
    discountedPrice: 750,
    price: 800,
    image: "/image-5.jpeg",
    reviewsNumber: 550,
  },
  {
    id: 2,
    name: "Solar-Powered Outdoor Lantern",
    discountedPrice: 2050,
    price: 2500,
    image: "/image-6.jpeg",
    reviewsNumber: 1050,
  },
  {
    id: 3,
    name: "Organic Cotton Tote Bag ",
    discountedPrice: 250,
    price: 300,
    image: "/image-7.jpeg",
    reviewsNumber: 250,
  },
];
