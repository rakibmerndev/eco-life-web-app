import { FC } from "react";
import Header from "../../shared/Header/Header";
import { Products } from "../../../dev-data/featuredProductData";
import ProductCard from "../../ProductCard/ProductCard";

const FeaturedProducts: FC = (): JSX.Element => {
  const AllProducts = Products;

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
      <div className="mt-28 grid grid-cols-1  md:grid-cols-3 gap-16 p-16">
        {AllProducts.map((product) => (
         <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
