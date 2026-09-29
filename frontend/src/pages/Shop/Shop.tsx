import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../api/axiosPublic";
import ProductCard from "../../components/ProductCard/ProductCard";

export interface ProductProps {
  id: string | number;
  name: string;
  discountedPrice: number;
  price: number;
  image: string;
  reviewsNumber: number;
}

const Shop = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="min-h-svh">
      <div className="mb-20">
        <h1
          className="text-2xl font-bold
        text-center"
        >
          Welcome to the Shop
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-16 p-5 xl:p-8">
          {data?.map((product: ProductProps) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
