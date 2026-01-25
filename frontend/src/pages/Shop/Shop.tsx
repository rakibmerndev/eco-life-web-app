import ProductCard from "../../components/ProductCard/ProductCard";
import { Products } from "../../dev-data/featuredProductData";

const Shop = () => {
   const AllProducts = Products;
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
