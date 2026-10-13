import { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../api/axiosPublic";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

const Checkout: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { cart, getCartTotal } = useCart();
  const { user, loading: authLoading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (user) {
      if (emailRef.current && user.email) {
        emailRef.current.value = user.email;
      }
      if (fullNameRef.current && user.displayName) {
        fullNameRef.current.value = user.displayName;
      }
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color"></div>
          <p className="text-primary-color mt-4 font-openSans">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="font-playFairDisplay text-3xl font-bold text-gray-800 mb-4">
            Please Log In
          </h1>
          <p className="text-gray-600 font-openSans mb-8">
            You need to be logged in to place an order.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-primary-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    const fullName = fullNameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const phone = phoneRef.current?.value.trim();
    const address = addressRef.current?.value.trim();
    const city = cityRef.current?.value.trim();
    const postalCode = postalCodeRef.current?.value.trim();

    if (!fullName || !email || !phone || !address || !city || !postalCode) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        products: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      const response = await axiosPublic.post(
        "/payment/create-checkout-session",
        orderData,
        {
          withCredentials: true,
        },
      );

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        toast.error("Failed to start checkout");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Failed to place order");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playFairDisplay text-4xl font-bold text-gray-800 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 font-openSans">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {/* Shipping Information */}
              <div className="mb-8">
                <h2 className="font-playFairDisplay text-2xl font-bold text-gray-800 mb-6">
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                      Full Name *
                    </label>
                    <input
                      ref={fullNameRef}
                      type="text"
                      placeholder="e.g., Sarah Ahmed"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                      Email *
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      placeholder="e.g., sarah.ahmed@mail.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                      Phone Number *
                    </label>
                    <input
                      ref={phoneRef}
                      type="tel"
                      placeholder="e.g., +880 1712 345678"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                      Postal Code *
                    </label>
                    <input
                      ref={postalCodeRef}
                      type="text"
                      placeholder="e.g., 1212"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                      City *
                    </label>
                    <input
                      ref={cityRef}
                      type="text"
                      placeholder="e.g., Dhaka, Chittagong"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                    />
                  </div>

                  {/* Address - Full Width */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                      Street Address *
                    </label>
                    <textarea
                      ref={addressRef}
                      placeholder="e.g., 45 Green Lane, Building B, Apartment 302"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                    />
                  </div>
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="border-t border-gray-200 pt-8">
                <h2 className="font-playFairDisplay text-2xl font-bold text-gray-800 mb-6">
                  Order Items
                </h2>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800 font-openSans">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 font-openSans">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-primary-color font-openSans">
                        {item.discountedPrice * item.quantity} $.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="font-playFairDisplay text-2xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* Item Count */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 font-openSans">
                <div className="flex justify-between text-gray-700">
                  <span>Items ({cart.length}):</span>
                  <span className="font-semibold">{total} $.</span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xl">
                  <span className="font-semibold text-gray-800">Total:</span>
                  <span className="font-bold text-primary-color text-2xl">
                    {total} $.
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className="w-full bg-primary-color text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed font-openSans"
              >
                {isLoading ? "Processing..." : "Place Order"}
              </button>

              {/* Form Info */}
              <div className="mt-6 bg-blue-50 border-l-4 border-primary-color p-4 rounded">
                <p className="text-xs text-gray-700 font-openSans leading-relaxed">
                  ✓ All fields are required
                </p>
                <p className="text-xs text-gray-700 font-openSans leading-relaxed mt-2">
                  ✓ Your data is secure
                </p>
                <p className="text-xs text-gray-700 font-openSans leading-relaxed mt-2">
                  ✓ Order confirmation will be sent to your email
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
