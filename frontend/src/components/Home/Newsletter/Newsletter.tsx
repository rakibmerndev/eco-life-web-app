import { FC } from "react";
import MainButton from "../../Button/MainButton";
import { MdEmail } from "react-icons/md";

const Newsletter: FC = (): JSX.Element => {
  return (
    <section className="mt-16 mb-20 relative">
      <div className="absolute -z-30 -left-11">
        <img src="/left.png" alt="" className="max-w-60" />
      </div>

      <div className="md:max-w-[1086px] md:max-h-[579px] mx-auto bg-[#D6F7E7] rounded-2xl px-4 md:px-20 py-4 md:py-16">
        <div className="md:max-w-[930px] md:max-h-[430px] bg-white flex flex-col md:flex-row">
          {/* image */}
          <div className="md:w-1/2">
            <img src="/news.png" className="object-cover h-full w-full" alt="" />
          </div>
          {/* form */}
          <div className="md:w-1/2">
            <form className="flex flex-col items-center px-10">
              <h1 className=" mt-4 lg:mt-7 text-center text-2xl font-bold font-playFairDisplay">
                "Stay Green & Informed!"
              </h1>
              <p className="mt-4 text-center text-base font-normal">
                Join Our Newsletter for Eco-Tips, Exclusive Offers, and
                Sustainability Stories Delivered to Your Inbox. No spam we
                promise 😛
              </p>
              <label htmlFor="Email" className="relative">
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Email Address"
                  className="border border-secondary-color mt-9 lg:w-[379px] h-[52px] pl-10  py-2 rounded-lg"
                />
                <div className="absolute top-1/2 translate-y-3 left-4 text-secondary-color">
                  <MdEmail />
                </div>
              </label>
              <MainButton value="subscribe" classes="my-4 lg:my-0 lg:mt-10 px-10 py-2" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
