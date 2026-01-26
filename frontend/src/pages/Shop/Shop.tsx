import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { axiosPublic } from "../../api/axiosPublic";

export interface ProductProps {
  id: string | number;
  name: string;
  discountedPrice: number;
  price: number;
  image: string;
  reviewsNumber: number;
}

const Shop = () => {
  const [data, setData] = useState<ProductProps[]>();

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const res = await axiosPublic.get("/products");
        setData(res.data);
      } catch (error) {
        console.log("Error fetching Products data", error);
      }
    };

    fetchProductsData();
  }, []);

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
