import { FC } from "react";
import { reviews } from "../../../dev-data/testimonails";
import { IoIosStar } from "react-icons/io";
import Header from "../../shared/Header/Header";

const Testimonials: FC = (): JSX.Element => {
  return (
    <section className="mt-20">
      <div className="text-center mt-20 flex items-center">
        <div className="border-b-[1px] border-[#A6C1D1] w-[calc(50%-82px)]"></div>
        <button className="inline-block text-center w-[164px] h-[42px] bg-[#6C8B76] text-white px-7 py-2 mx-auto shadow-lg transition-all hover:scale-105 duration-300 border-b-4 border-gray-400 rounded-md hover:bg-green-700">
          Explore More
        </button>
        <div className="border-b-[1px] border-[#A6C1D1] w-[calc(50%-82px)]"></div>
      </div>

      <div className="mt-24 relative mb-10">
        <Header title="Customer Testimonials" />
        <div className="absolute -z-10 -left-10 lg:left-0 md:-top-2 lg:-top-8">
          <img
            src="/left.png"
            className="xs:max-w-[150px] lg:max-w-[200px] lg:max-h-[273px]"
            alt=""
          />
        </div>

        <div className="absolute -z-10 -right-32 top-10 md:-right-28 md:-top-8 lg:-right-48 lg:-top-16">
          <img
            src="/Think.png"
            className="xs:max-w-[300px]  lg:max-w-[506px] lg:max-h-[424px]"
            alt=""
          />
        </div>
      </div>

      <div className="p-16 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {reviews.map((review) => {
          return (
            <div
              key={review.id}
              className="rounded-2xl border border-green-500 flex flex-col items-center"
            >
              <img
                src={review.image}
                alt={review.name}
                className="mt-3 max-w-[169px] max-h-[134px] object-contain"
              />
              <h3 className="mt-3 mb-7 text-2xl font-semibold text-primary-color">
                {review.name}
              </h3>
              <p className="px-4 font-normal text-base text-secondary-color text-center mb-5">
                "{review.review}"
              </p>
              <div className="mt-auto mb-10 flex gap-1 text-secondary-color text-xl">
                {[...Array(review.stars)].map((_, i) => (
                  <IoIosStar key={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
