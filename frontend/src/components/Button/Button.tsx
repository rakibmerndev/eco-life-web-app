import { FC } from "react";

interface ButtonProps {
  value: string;
  link?: string;
}

const Button: FC<ButtonProps> = ({ value }): JSX.Element => {
  return (
    <button className="inline-block text-center w-[164px] h-[42px] bg-primary-color text-white px-7 py-2 mx-auto shadow-lg transition-all hover:scale-105  duration-300 border-black border-b-4  rounded-md hover:bg-green-700 ">
      {value}
    </button>
  );
};
export default Button;
