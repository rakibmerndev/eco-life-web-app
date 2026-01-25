import man from "../../../assets/Man.png";
import React, { FC } from "react";
import Header from "../../shared/Header/Header";
import { data } from "../../../dev-data/whyChoose";



const WhyChooseEcoLife: FC = (): JSX.Element => {
  const all = data;

  return (
    <section>
      <div className="mt-10 md:mt-56 relative">
        <Header title="Why choose EcoLife?" />
        <img
          src={man}
          alt="man-thinking"
          className="hidden md:flex absolute md:-bottom-20 -left-1"
        />
      </div>
      {/* card section */}
      <div className="mt-20 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1280px] mx-auto">
        {/* card */}
        {all.map(
          (data, index) => (
            <div
              key={index}
              className="flex flex-col max-h-[350px]  items-center"
            >
              <div className=" mb-5 flex justify-center items-center overflow-hidden">
                <img
                  src={data.image}
                  alt="image"
                  className="rounded-full h-[110px] w-[110px] shadow-md object-cover"
                  style={{ boxShadow: "0px 0px 10px 1px #D6F7E7" }}
                />
              </div>
              <h1 className="text-primary-color text-2xl max-w-[241px] font-semibold text-center mb-2 max-h-[69px]">
                {data.heading.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h1>
              <p className="text-xl font-light max-w-[273px] text-center text-secondary-color">
                {data.description}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default WhyChooseEcoLife;
