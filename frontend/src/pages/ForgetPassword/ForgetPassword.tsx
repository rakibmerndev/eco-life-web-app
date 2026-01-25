import { FC } from "react";
import RfContainer from "../../components/Containers/RfContainer";
import useAuth from "../../hooks/useAuth";

const ForgetPassword: FC = (): JSX.Element => {
  const { sendResetPasswordEmail } = useAuth();

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    sendResetPasswordEmail(email);
  };

  return (
    <RfContainer>
      <div>
        <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30  relative">
          <h1 className="text-4xl text-white font-bold text-center mb-6">
           Reset Password
          </h1>
          <form onSubmit={(e) => handleResetPassword(e)}>
            <div className="relative my-10">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-72 py-2 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500  focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              />
              <label
                htmlFor="email"
                className="absolute text-lg text-white duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 "
              >
                Email
              </label>
            </div>
            <button
              className="w-full font-semibold mb-4 text-sm mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition duration-300 ease-in-out"
              type="submit"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </RfContainer>
  );
};

export default ForgetPassword;
