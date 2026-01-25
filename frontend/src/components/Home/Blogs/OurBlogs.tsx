import { FC } from "react";
import Header from "../../shared/Header/Header";
import { Blogs } from "../../../dev-data/blogsdata";
import Button from "../../Button/Button";

const OurBlogs: FC = (): JSX.Element => {
  return (
    <section className="bg-[#D6F7E7] relative pb-24">
      <div className="absolute md:left-10 top-10">
        <img
          className="max-w-[50px] md:max-w-[95px]"
          src="/white-butterfly.png"
          alt=""
        />
      </div>
      <div className="absolute md:right-10 top-10">
        <img
          className="max-w-[50px] md:max-w-[95px]"
          src="/white-butterfly.png"
          alt=""
        />
      </div>
      <div className="pt-14">
        <Header title="Our Blogs" />
      </div>
      <div>
        <div className="mt-12 px-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {Blogs.map((blog) => (
            <div
              className="bg-white rounded-2xl border-2 shadow-md border-primary-color flex flex-col items-center"
              key={blog.id}
            >
              <img
                src={blog.image}
                alt=""
                className="px-2 xl:max-w-[334px] lg:max-h-[184px] mt-2 rounded-t-2xl xl:mt-14"
              />
              <div className="mb-5 xl:mb-10">
                <h1 className="mt-6 text-center text-primary-color font-semibold text-xl md:text-2xl px-5">
                  {blog.title}
                </h1>
                <p className="px-2 mt-5 xl:mt-14 text-secondary-color text-center text-sm md:text-base">
                  {blog.description}
                </p>
              </div>
              <div className="mt-auto mb-14 ">
                <Button value="READ MORE" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-2 -bottom-8">
        <img src="/leaf-white.png" className="max-w-[80px]" alt="" />
      </div>
    </section>
  );
};

export default OurBlogs;
