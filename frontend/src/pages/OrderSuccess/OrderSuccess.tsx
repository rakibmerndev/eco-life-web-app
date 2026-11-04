import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { axiosPublic } from "../../api/axiosPublic";
import MainButton from "../../components/Button/MainButton";
import { useCart } from "../../hooks/useCart";

const OrderSuccess: FC = (): JSX.Element => {
  const { clearCart } = useCart();

  //session ID from URL
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id",
  );

  //  fetch order confirmation
  const { data, isLoading, error } = useQuery({
    queryKey: ["checkout-success", sessionId],
    queryFn: async () => {
      const res = await axiosPublic.post(
        "/payment/checkout-success",
        { sessionId },
        { withCredentials: true },
      );
      return res.data;
    },
    enabled: !!sessionId,
    retry: false,
  });

  // Clear cart on successful order
  useEffect(() => {
    if (data?.success) {
      clearCart();
    }
  }, [data, clearCart]);

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-red-500 text-xl font-openSans">
            Error: No session ID found in the URL
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color"></div>
          <p className="text-primary-color mt-4 font-openSans">
            Processing your order...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-red-500 text-xl font-openSans">
            Error: {(error as Error).message}
          </p>
        </div>
      </div>
    );
  }

  const orderData = data?.order;

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <FaCheckCircle size={80} className="text-green-500" />
        </div>

        {/* Header */}
        <h1 className="font-playFairDisplay text-4xl font-bold text-gray-800 mb-3">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 font-openSans text-lg mb-8">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {/* Order ID */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <p className="text-gray-600 font-openSans mb-2">Order ID</p>
          <p className="text-2xl font-bold text-primary-color font-openSans break-all">
            {orderData?._id}
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-primary-color p-6 rounded-lg mb-8">
          <h3 className="font-semibold text-gray-800 mb-3 font-openSans">
            What's Next?
          </h3>
          <ul className="text-left space-y-2 font-openSans text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary-color mt-1">✓</span>
              <span>
                A confirmation email has been sent to your email address
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-color mt-1">✓</span>
              <span>You can track your order status in your account</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-color mt-1">✓</span>
              <span>Your order will be shipped within 2-3 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-color mt-1">✓</span>
              <span>Free shipping on all orders</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/shop" className="flex-1">
            <MainButton value="Continue Shopping" classes="w-full py-3 px-6" />
          </Link>
          <button className="flex-1 px-6 py-3 border-2 border-primary-color text-primary-color rounded-lg font-semibold hover:bg-primary-color hover:text-white transition-all duration-300 font-openSans">
            View My Orders
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-600 font-openSans">
          <p>
            Need help? Contact us at{" "}
            <a
              href="mailto:support@ecolife.com"
              className="text-primary-color hover:underline"
            >
              support@ecolife.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
