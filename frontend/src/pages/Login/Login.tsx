import { FC } from "react";
import { FaGoogle } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login: FC = (): JSX.Element => {
  const { signInUser, googleSignIn } = useAuth();

  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    signInUser(email, password);

    navigate("/");
  };

  return (
    <section className="bg-[#D6F7E7] min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border-2 border-primary-color shadow-md p-8 md:p-12">
        <h1 className="font-playFairDisplay text-primary-color font-bold text-4xl text-center mb-8">
          Welcome Back
        </h1>
        <p className="text-center text-secondary-color mb-8">
          Sign in to your account to continue
        </p>

        <form onSubmit={(e) => handleEmailLogin(e)} className="space-y-6">
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

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-primary-color mb-2"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <MdLock className="absolute left-3 text-secondary-color text-lg" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-secondary-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="w-4 h-4 accent-primary-color rounded cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-secondary-color cursor-pointer">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-primary-color hover:text-green-700 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-primary-color text-white font-semibold py-3 rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>

          {/* Signup Link */}
          <div className="text-center">
            <span className="text-sm text-secondary-color">
              New to EcoLife?{" "}
              <Link to="/signup" className="text-primary-color font-semibold hover:text-green-700 transition-colors">
                Create an account
              </Link>
            </span>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-secondary-color opacity-30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-secondary-color">Or continue with</span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={googleSignIn}
          className="w-full flex justify-center items-center gap-3 bg-white border-2 border-primary-color text-primary-color font-semibold py-3 rounded-lg hover:bg-[#D6F7E7] hover:scale-105 transition-all duration-300"
        >
          <FaGoogle className="text-lg" />
          <span>Continue with Google</span>
        </button>
      </div>
    </section>
  );
};

export default Login;
