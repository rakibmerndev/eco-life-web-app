import { FC } from "react";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


const Register: FC = (): JSX.Element => {
  const { createUser, updateUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.username.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    await createUser(email, password);
    await updateUser(name, "");
  };

  return (
    <section className="bg-[#D6F7E7] min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border-2 border-primary-color shadow-md p-8 md:p-12">
        <h1 className="font-playFairDisplay text-primary-color font-bold text-4xl text-center mb-2">
          Join EcoLife
        </h1>
        <p className="text-center text-secondary-color mb-8">
          Create your account and start your sustainable journey
        </p>

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-primary-color mb-2"
            >
              Full Name
            </label>
            <div className="relative flex items-center">
              <MdPerson className="absolute left-3 text-secondary-color text-lg" />
              <input
                type="text"
                name="username"
                id="name"
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 border border-secondary-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

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

          {/* Terms & Conditions */}
          <div className="flex gap-2 items-start">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="w-4 h-4 mt-1 accent-primary-color rounded cursor-pointer"
              required
            />
            <label htmlFor="terms" className="text-sm text-secondary-color cursor-pointer">
              I agree to the{" "}
              <Link to="#" className="text-primary-color font-semibold hover:text-green-700">
                Terms & Conditions
              </Link>
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-primary-color text-white font-semibold py-3 rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Create Account
          </button>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-sm text-secondary-color">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-color font-semibold hover:text-green-700 transition-colors">
                Login
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
            <span className="px-2 bg-white text-secondary-color">Or</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-[#D6F7E7] rounded-lg p-4">
          <p className="text-xs text-secondary-color text-center mb-3 font-semibold">
            Why join EcoLife?
          </p>
          <ul className="text-xs text-secondary-color space-y-2 text-center">
            <li>✓ Access exclusive eco-friendly products</li>
            <li>✓ Get sustainability tips & guides</li>
            <li>✓ Track your environmental impact</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Register;
