import { FC } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import MainButton from "../../components/Button/MainButton";

const OrderSuccess: FC = (): JSX.Element => {
  const location = useLocation();
  const orderId = location.state?.orderId || "N/A";

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
            {orderId}
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
              <span>A confirmation email has been sent to your email address</span>
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
