import { FC } from "react";
import Header from "../../shared/Header/Header";

import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../api/axiosPublic";
import { ProductProps } from "../../../pages/Shop/Shop";
import ProductCard from "../../ProductCard/ProductCard";

const FeaturedProducts: FC = (): JSX.Element => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products/featured");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color"></div>
          <p className="text-primary-color mt-4 font-openSans">Loading...</p>
        </div>
      </div>
    );

  return (
    <section className="relative mt-16">
      <Header title="Featured Products" />
      {/* overlay */}
      <div className="absolute left-0 -z-20 xs:translate-x-5  translate-y-32 base:translate-x-8 md:translate-y-28 md:translate-x-5 lg:translate-y-24 lg:translate-x-3 xl:translate-y-16">
        <img
          className="max-w-[100px] md:max-w-[150px] lg:max-w-[180px] xl:max-w-[232px] xl:max-h-[273px]"
          src="/left.png"
          alt=""
        />
      </div>
      <div className="absolute right-0 -z-20 xs:-translate-x-5 translate-y-20 base:-translate-x-8  md:translate-y-5 md:-translate-x-5 lg:-translate-y-5 lg:-translate-x-3 xl:-translate-y-20">
        <img
          className="max-w-[100px] md:max-w-[150px] lg:max-w-[180px] xl:max-w-[232px] xl:max-h-[273px]"
          src="/right.png"
          alt=""
        />
      </div>
      {/* main content */}
      <div className="mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-16 p-5 xl:p-8">
        {products?.map((product: ProductProps) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
