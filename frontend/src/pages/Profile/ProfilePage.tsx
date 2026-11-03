import { useQuery } from "@tanstack/react-query";
import { FC, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../api/axiosPublic";
import { useAuth } from "../../hooks/useAuth";

const ProfilePage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, updateUser, loading: authLoading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const photoUrlRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(data, isLoading);

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
            You need to be logged in to view your profile.
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

  const handleSaveProfile = async () => {
    const name = nameRef.current?.value.trim();
    const photoUrl = photoUrlRef.current?.value.trim();

    if (!name) {
      toast.error("Name is required");
      return;
    }

    setIsSaving(true);

    try {
      updateUser(name, photoUrl || "");
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playFairDisplay text-4xl font-bold text-gray-800 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 font-openSans">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cover Banner */}
          <div className="h-36 bg-gradient-to-r from-primary-color to-secondary-color"></div>

          {/* Profile Picture & Name Section */}
          <div className="px-6 md:px-8 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                  {data?.imageUrl ? (
                    <img
                      src={data?.imageUrl}
                      alt={data?.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-color text-white text-4xl font-bold font-playFairDisplay">
                      {data?.name
                        ? data?.name.charAt(0).toUpperCase()
                        : user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Name & Email */}
              <div className="text-center sm:text-left sm:pb-1">
                <h2 className="font-playFairDisplay text-2xl font-bold text-gray-800">
                  {data?.name || "User"}
                </h2>
                <p className="text-gray-500 font-openSans text-sm">
                  {user.email}
                </p>
              </div>

              {/* Edit Button */}
              <div className="sm:ml-auto sm:pb-1">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary-color text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 font-openSans text-sm"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 font-openSans text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="bg-primary-color text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed font-openSans text-sm"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h3 className="font-playFairDisplay text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              Personal Information
            </h3>

            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    ref={nameRef}
                    type="text"
                    defaultValue={data?.name || ""}
                    placeholder="e.g., Sarah Ahmed"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                  />
                ) : (
                  <p className="text-gray-800 font-openSans px-4 py-2 bg-gray-50 rounded-lg">
                    {data?.name || "—"}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                  Email Address
                </label>
                <p className="text-gray-800 font-openSans px-4 py-2 bg-gray-50 rounded-lg">
                  {user.email || "—"}
                </p>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    ref={phoneRef}
                    type="tel"
                    defaultValue={user.phoneNumber || ""}
                    placeholder="e.g., +880 1712 345678"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                  />
                ) : (
                  <p className="text-gray-800 font-openSans px-4 py-2 bg-gray-50 rounded-lg">
                    {user.phoneNumber || "—"}
                  </p>
                )}
              </div>

              {/* Profile Photo URL */}
              {isEditing && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                    Profile Photo URL
                  </label>
                  <input
                    ref={photoUrlRef}
                    type="url"
                    defaultValue={data?.imageUrl || ""}
                    placeholder="e.g., https://example.com/photo.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h3 className="font-playFairDisplay text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              Address Information
            </h3>

            <div className="space-y-5">
              {/* Street Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                  Street Address
                </label>
                {isEditing ? (
                  <textarea
                    ref={addressRef}
                    placeholder="e.g., 45 Green Lane, Building B, Apartment 302"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                  />
                ) : (
                  <p className="text-gray-800 font-openSans px-4 py-2 bg-gray-50 rounded-lg min-h-[4rem]">
                    —
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                  City
                </label>
                {isEditing ? (
                  <input
                    ref={cityRef}
                    type="text"
                    placeholder="e.g., Dhaka, Chittagong"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                  />
                ) : (
                  <p className="text-gray-800 font-openSans px-4 py-2 bg-gray-50 rounded-lg">
                    —
                  </p>
                )}
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-openSans">
                  Postal Code
                </label>
                {isEditing ? (
                  <input
                    ref={postalCodeRef}
                    type="text"
                    placeholder="e.g., 1212"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color font-openSans"
                  />
                ) : (
                  <p className="text-gray-800 font-openSans px-4 py-2 bg-gray-50 rounded-lg">
                    —
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Info Footer */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 md:p-8">
          <h3 className="font-playFairDisplay text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
            Account Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 font-openSans mb-1">
                Email Verified
              </p>
              <p className="font-semibold font-openSans">
                {user.emailVerified ? (
                  <span className="text-primary-color">✓ Verified</span>
                ) : (
                  <span className="text-red-500">✗ Not Verified</span>
                )}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 font-openSans mb-1">
                Account Created
              </p>
              <p className="font-semibold text-gray-800 font-openSans">
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )
                  : "—"}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 font-openSans mb-1">
                Last Sign In
              </p>
              <p className="font-semibold text-gray-800 font-openSans">
                {user.metadata.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
