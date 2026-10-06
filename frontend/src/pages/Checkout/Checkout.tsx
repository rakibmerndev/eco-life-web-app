import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../api/axiosPublic";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

interface ShippingFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

const Checkout: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ShippingFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    if (user && (!formData.email || !formData.fullName)) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        fullName: user.displayName || prev.fullName,
      }));
    }
  }, [user?.email, user?.displayName]);

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0 && !isLoading) {
      navigate("/cart");
    }
  }, [cart.length, isLoading, navigate]);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {
      toast.error("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const orderData = {
        userEmail: user?.email,
        products: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        totalPrice: getCartTotal(),
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        orderStatus: "pending",
        paymentStatus: "pending",
      };

      const response = await axiosPublic.post("/orders", orderData, {
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success("Order placed successfully!");

        clearCart();

        setTimeout(() => {
          navigate("/order-success", {
            state: { orderId: response.data._id },
          });
        }, 1500);
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
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+88 01234 567890"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="1200"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Dhaka"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                    />
                  </div>

                  {/* Address - Full Width */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                      Street Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street, Apt 4B"
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
                        {item.discountedPrice * item.quantity} Tk.
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
                  <span className="font-semibold">{total} Tk.</span>
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
