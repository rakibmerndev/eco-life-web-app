import ProductCard from "../../components/ProductCard/ProductCard";

import { ShopProducts } from "../../dev-data/shop";

const Shop = () => {
  const AllProducts = ShopProducts;
  return (
    <div className="min-h-svh">
      <div className="mb-20">
        <h1
          className="text-2xl font-bold
        text-center"
        >
          Welcome to the Shop
        </h1>

        <div className="grid grid-cols-1  md:grid-cols-3 gap-16 p-16">
          {AllProducts.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
