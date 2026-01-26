import { ProductProps } from "../../pages/Shop/Shop";
import Button from "../Button/Button";

const ProductCard = ({ product }: { product: ProductProps }) => {
  return (
    <div
      className="
        w-full sm:w-[250px] md:w-[300px] lg:w-[300px]
        flex flex-col bg-white rounded-lg shadow-md overflow-hidden p-3
        sm:h-[380px] md:h-[450px] lg:h-[480px]
      "
    >
      {/* Image */}
      <div className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] flex-shrink-0">
        <img
          src={product?.image}
          alt="product-image"
          className="w-full h-full object-cover hover:scale-105 duration-300 transition-all"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          {/* Name */}
          <h1 className="text-[#36B281] text-sm sm:text-base md:text-lg lg:text-xl font-semibold truncate mt-2">
            {product?.name}
          </h1>

          {/* Price & Reviews */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="text-sm sm:text-base md:text-lg font-extrabold">
                {product?.discountedPrice} Tk.
              </p>
              <p className="text-xs sm:text-sm md:text-base font-bold line-through text-gray-400">
                {product?.price} Tk.
              </p>
            </div>
            <a
              href="#"
              className="text-xs sm:text-sm md:text-base font-normal underline text-gray-600 whitespace-nowrap"
            >
              {product?.reviewsNumber} reviews
            </a>
          </div>
        </div>

        {/* Button always at bottom */}
        <div className="mt-4 flex justify-center">
          <Button value="Buy Now" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
