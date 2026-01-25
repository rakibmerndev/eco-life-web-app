import { ProductProps } from "../../dev-data/featuredProductData";
import Button from "../Button/Button";

type ProductCardProps = {
  product: ProductProps;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div
      className="max-w-[413px] max-h-[612px] overflow-hidden"
      key={product?.id}
    >
      <img
        src={product?.image}
        alt="product-image"
        className="w-[380px] xl:h-[451px] object-contain hover:scale-105 duration-300 transition-all"
      />
      <h1 className="mt-5 text-[#36B281] text-2xl font-semibold">
        {product?.name}
      </h1>
      {/* text description */}
      <div className="flex justify-between mt-3 items-center">
        <div className="flex gap-2 lg:gap-4 items-center">
          <p className=" text-lg lg:text-2xl font-extrabold">
            {product?.discountedPrice} Tk.
          </p>
          <p className="text-base lg:text-lg font-bold">{product?.price} Tk.</p>
        </div>
        <a href="#" className="text-lg font-normal underline">
          {" "}
          {product?.reviewsNumber} reviews
        </a>
      </div>
      <div className="text-center mt-5">
        <Button value="Buy Now" />
      </div>
    </div>
  );
};

export default ProductCard;
