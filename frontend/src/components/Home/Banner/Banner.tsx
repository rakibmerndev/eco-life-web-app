import { FC } from "react";
import bannerImg from "../../../assets/banner.png";
import leafImg from "../../../assets/leaf.png";
import Lottie from "react-lottie-player";

import "./Banner.css";

import butterFlyAnimation from "./butterfly.json";
import MainButton from "../../Button/MainButton";

const Banner: FC = (): JSX.Element => {
  return (
    <section className="mt-20 px-2">
      <div className="flex flex-col md:flex-row gap-5 justify-center items-center ">
        {/* texts */}
        <div className="relative">
          <h1 className="font-playFairDisplay text-primary-color font-black text-4xl md:text-6xl">
            Welcome to EcoLife
          </h1>

          <img
            className="absolute xs:right-10 md:right-0 lg:right-12 xl:-right-10 -top-12 -translate-y-2"
            src={leafImg}
            alt="leaf-image"
          />

          <p className="text-primary-color text-2xl md:text-3xl lg:text-4xl mt-8">
            Your Journey to a
          </p>
          <p className="font-secondary text-2xl md:text-3xl lg:text-4xl mt-2">
            Sustainable Lifestyle
          </p>
          <p className="text-primary-color text-2xl md:text-3xl lg:text-4xl mt-2">
            Starts Here.
          </p>
          <p className="text-primary-color mt-10 mb-6 lg:mb-2">
            Browse our curated selection of eco-friendly
            <br />
            products and make every purchase count
          </p>
         <MainButton value="Shop now" classes="mt-8 lg:mt-12 px-4 py-2 lg:px-10 lg:py-4 "/>

          <div className="absolute translate-y-4 md:bottom-8 md:left-24 lg:left-36 lg:bottom-14 xl:left-36 xl:bottom-14 2xl:bottom-14 2xl:left-36 butter-fly">
            <div className="rotate-[-45deg]">
              <Lottie
                loop
                animationData={butterFlyAnimation}
                play
                style={{ width: 80, height: 80 }}
              />
            </div>
          </div>
        </div>

        {/* image */}
        <div className="hidden md:flex">
          <img src={bannerImg} alt="banner-image" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
