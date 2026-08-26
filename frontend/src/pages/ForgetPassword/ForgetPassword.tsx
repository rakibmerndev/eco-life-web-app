import { FC } from "react";
import { MdEmail, MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ForgetPassword: FC = (): JSX.Element => {
  const { sendResetPasswordEmail } = useAuth();

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    sendResetPasswordEmail(email);
  };

  return (
    <section className="bg-[#D6F7E7] min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border-2 border-primary-color shadow-md p-8 md:p-12">
        {/* Back Link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-primary-color hover:text-green-700 transition-colors mb-6 font-semibold"
        >
          <MdArrowBack className="text-lg" />
          <span>Back to Login</span>
        </Link>

        <h1 className="font-playFairDisplay text-primary-color font-bold text-4xl text-center mb-2">
          Reset Password
        </h1>
        <p className="text-center text-secondary-color mb-8">
          Enter your email address and we'll send you a link to reset your password
        </p>

        <form onSubmit={(e) => handleResetPassword(e)} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-primary-color mb-2"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <MdEmail className="absolute left-3 text-secondary-color text-lg" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-secondary-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Send Reset Link Button */}
          <button
            type="submit"
            className="w-full bg-primary-color text-white font-semibold py-3 rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Send Reset Link
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 bg-[#D6F7E7] rounded-lg p-4 border border-primary-color border-opacity-20">
          <p className="text-sm text-secondary-color text-center">
            💡 Check your email for a link to reset your password. The link will expire in 24 hours.
          </p>
        </div>

        {/* Additional Support */}
        <div className="text-center mt-8">
          <p className="text-sm text-secondary-color">
            Didn't receive the email?{" "}
            <button
              type="button"
              className="text-primary-color font-semibold hover:text-green-700 transition-colors"
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
