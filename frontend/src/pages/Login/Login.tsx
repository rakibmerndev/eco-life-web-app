import { FC } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import RfContainer from "../../components/Containers/RfContainer";
import { FaGoogle } from "react-icons/fa";

const Login: FC = (): JSX.Element => {
  const { signInUser, googleSignIn } = useAuth();

  const handleGoogleLogin = () => {
    googleSignIn();
  };

  const handleEmailLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    signInUser(email, password);
  };

  return (
    <RfContainer>
      <div>
        <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30  relative">
          <h1 className="text-4xl text-white font-bold text-center mb-6">
            Login
          </h1>
          <form onSubmit={(e) => handleEmailLogin(e)}>
            <div className="relative my-10">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-72 py-2 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500  focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              required/>
              <label
                htmlFor="email"
                className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 "
              >
                Email
              </label>
            </div>
            <div className="relative my-10">
              <input
                type="password"
                name="password"
                id="password"
                className="block w-72 py-2 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500  focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              required/>
              <label
                htmlFor="password"
                className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 "
              >
                Password
              </label>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember" className="text-sm">
                  Remember Me
                </label>
              </div>
              <Link to="/forgot-password" className="text-blue-500">
                Forgot Password?
              </Link>
            </div>
            <button
              className="w-full font-semibold mb-4 text-sm mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition duration-300 ease-in-out"
              type="submit"
            >
              Login
            </button>
            <div className="text-sm text-center">
              <span>
                New Here? <Link to="/signup" className="hover:text-blue-500">Create an account</Link>
              </span>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="mb-2 font-semibold text-sm">Or</p>
            <button
              onClick={handleGoogleLogin}
              className="flex justify-center items-center gap-2 w-full font-semibold mb-4 text-sm  rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition duration-300 ease-in-out"
            >
              <span>Log in with</span> <FaGoogle />
            </button>
          </div>
        </div>
      </div>
    </RfContainer>
  );
};

export default Login;
