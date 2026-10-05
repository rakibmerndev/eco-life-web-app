import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaMinus, FaPlus, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosPublic } from "../../api/axiosPublic";
import MainButton from "../../components/Button/MainButton";
import { ProductProps } from "../Shop/Shop";
import { useCart } from "../../hooks/useCart";

const ProductDetail = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const { data, isLoading } = useQuery<ProductProps>({
    queryKey: ["product-detail", params.id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${params.id}`);
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

  const handleQuantityChange = (value: number) => {
    if (value > 0) setQuantity(value);
  };

  const handleAddToCart = () => {
    if (!data) return;

    const cartItem = {
      productId: String(data._id),
      quantity,
      name: data.name,
      price: data.price,
      discountedPrice: data.discountedPrice,
      image: data.image,
    };

    addToCart(cartItem);
    toast.success(`${data.name} added to cart!`);
  };

  const averageRating = "4";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm font-openSans text-gray-600">
          <Link to="/shop" className="text-primary-color hover:underline">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{data?.name}</span>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center h-96 md:h-[500px]">
              <img
                src={data?.image}
                alt={data?.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col gap-6">
            {/* Product Name */}
            <div>
              <h1 className="font-playFairDisplay text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {data?.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(parseFloat(averageRating))
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-openSans">
                  {averageRating} ({data?.reviewsNumber} reviews)
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-bold text-primary-color">
                  {data?.discountedPrice} Tk.
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {data?.price} Tk.
                </span>
              </div>
              <div className="text-sm text-green-600 font-semibold">
                Save{" "}
                {data?.price && data?.discountedPrice
                  ? Math.round(
                      ((data.price - data.discountedPrice) / data.price) * 100,
                    )
                  : 0}
                %
              </div>
            </div>

            {/* Description */}
            <div className="text-gray-700 font-openSans leading-relaxed">
              <p className="text-sm md:text-base">
                Experience the perfect blend of sustainability and quality with
                this eco-friendly product. Crafted with environmental
                consciousness and modern design principles, this item is an
                excellent choice for those committed to reducing their carbon
                footprint while maintaining high standards of quality and
                functionality.
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="border-b border-gray-200 pb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3 w-fit">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="flex items-center justify-center w-10 h-10 border border-primary-color rounded-md hover:bg-primary-color hover:text-white transition-all duration-200"
                >
                  <FaMinus size={14} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="w-16 h-10 text-center border border-gray-300 rounded-md font-semibold focus:outline-none focus:border-primary-color"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="flex items-center justify-center w-10 h-10 border border-primary-color rounded-md hover:bg-primary-color hover:text-white transition-all duration-200"
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 flex-1 bg-primary-color text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <FaShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
