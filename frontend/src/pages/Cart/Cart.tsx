import { FC } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
import MainButton from "../../components/Button/MainButton";

const Cart: FC = (): JSX.Element => {
  const { cart, updateCart, deleteFromCart, clearCart, getCartTotal } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h1 className="font-playFairDisplay text-4xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 font-openSans mb-8">
            Start shopping for eco-friendly products today!
          </p>
          <Link to="/shop">
            <MainButton value="Continue Shopping" classes="px-8 py-3" />
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const total = subtotal;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playFairDisplay text-4xl font-bold text-gray-800 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 font-openSans">
            {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Table Header - Hidden on Mobile */}
              <div className="hidden md:grid md:grid-cols-5 gap-4 p-6 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                <div className="md:col-span-2">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-center">Action</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 font-openSans">
                            {item.name}
                          </h3>
                          <p className="text-primary-color font-bold mt-1">
                            {item.discountedPrice} Tk.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateCart(item.productId, item.quantity - 1)
                            }
                            className="flex items-center justify-center w-8 h-8 border border-primary-color rounded hover:bg-primary-color hover:text-white transition-all"
                          >
                            <FaMinus size={12} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateCart(
                                item.productId,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-12 h-8 text-center border border-gray-300 rounded font-semibold focus:outline-none focus:border-primary-color"
                          />
                          <button
                            onClick={() =>
                              updateCart(item.productId, item.quantity + 1)
                            }
                            className="flex items-center justify-center w-8 h-8 border border-primary-color rounded hover:bg-primary-color hover:text-white transition-all"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => deleteFromCart(item.productId)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>

                      <p className="text-gray-700 font-semibold text-right">
                        Subtotal:{" "}
                        <span className="text-primary-color">
                          {item.discountedPrice * item.quantity} Tk.
                        </span>
                      </p>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:grid md:grid-cols-5 gap-4 items-center">
                      {/* Product Info */}
                      <div className="md:col-span-2 flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800 font-openSans">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            ID: {item.productId}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-center">
                        <p className="text-primary-color font-bold">
                          {item.discountedPrice} Tk.
                        </p>
                        <p className="text-xs text-gray-500 line-through">
                          {item.price} Tk.
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              updateCart(item.productId, item.quantity - 1)
                            }
                            className="flex items-center justify-center w-8 h-8 border border-primary-color rounded hover:bg-primary-color hover:text-white transition-all"
                          >
                            <FaMinus size={12} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateCart(
                                item.productId,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-12 h-8 text-center border border-gray-300 rounded font-semibold focus:outline-none focus:border-primary-color"
                          />
                          <button
                            onClick={() =>
                              updateCart(item.productId, item.quantity + 1)
                            }
                            className="flex items-center justify-center w-8 h-8 border border-primary-color rounded hover:bg-primary-color hover:text-white transition-all"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <div className="text-center">
                        <button
                          onClick={() => deleteFromCart(item.productId)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping Button */}
            <div className="mt-6">
              <Link to="/shop">
                <button className="text-primary-color font-semibold hover:underline font-openSans">
                  ← Continue Shopping
                </button>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="font-playFairDisplay text-2xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 font-openSans">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{subtotal} Tk.</span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xl">
                  <span className="font-semibold text-gray-800">Total:</span>
                  <span className="font-bold text-primary-color text-2xl">
                    {total} Tk.
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout" className="w-full block">
                <MainButton
                  value="Proceed to Checkout"
                  classes="w-full py-3 mb-3"
                />
              </Link>

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="w-full py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-semibold font-openSans"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
