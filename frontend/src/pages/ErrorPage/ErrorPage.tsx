import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const ErrorPage: FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className=" min-h-svh flex justify-center items-center relative">
      <img
        src="https://cdn.dribbble.com/users/1166837/screenshots/5995598/404-error_dribbble_small.gif"
        alt="animated-gif"
      />

      <div className="absolute bottom-56 flex flex-col justify-center space-y-2">
        <h4 className=" text-[#5DBA6D] font-bold text-4xl">404 Not Found</h4>
        <button
          className="border w-1/2 mx-auto bg-green-700 rounded-md text-white py-1 hover:bg-green-600"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
