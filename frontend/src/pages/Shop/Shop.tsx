import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../api/axiosPublic";
import ProductCard from "../../components/ProductCard/ProductCard";

export interface ProductProps {
  _id: string | number;
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color"></div>
          <p className="text-primary-color mt-4 font-openSans">Loading...</p>
        </div>
      </div>
    );

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
