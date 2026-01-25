import { FC } from "react";

type RfContainerProps = {
  children: JSX.Element;
};

// * RfContainer means Registration form container 😛 (what a name lol!)

const RfContainer: FC<RfContainerProps> = ({ children }): JSX.Element => {
  return (
    <div
      className="text-white h-[100vh] flex justify-center items-center bg-cover"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/hd/green-nature-leaf-with-dew-pdju0rwgg16bn5nb.jpg')`,
      }}
    >
      {children}
    </div>
  );
};

export default RfContainer;
