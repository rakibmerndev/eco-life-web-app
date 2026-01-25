import { FC } from "react";

const About: FC = (): JSX.Element => {
  return (
    <section className="relative mt-16 mb-20 min-h-[calc(100vh-160px)] flex items-center">
      {/* Decorative left image */}
      <div className="absolute -z-30 -left-11 top-1/2 -translate-y-1/2">
        <img src="/left.png" alt="Eco Life decorative" className="max-w-60" />
      </div>

      {/* Main container */}
      <div className="w-full px-4">
        <div className="max-w-[1086px] mx-auto bg-[#D6F7E7] rounded-2xl px-4 md:px-20 py-8 md:py-16">
          <div className="bg-white rounded-2xl flex flex-col md:flex-row gap-8 p-6 md:p-12">
            {/* Left content: Text */}
            <div className="md:w-1/2 space-y-5">
              <h2 className="text-3xl font-semibold text-gray-800">
                About Eco Life
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Eco Life is your online destination for eco-friendly,
                sustainable products. Our mission is to make conscious shopping
                easy, affordable, and impactful.
              </p>

              <p className="text-gray-600 leading-relaxed">
                From reusable household items to zero-waste personal care, we
                curate products that help you live sustainably without
                compromising quality or convenience.
              </p>

              <div className="pt-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Our Mission
                </h4>
                <p className="text-gray-600">
                  To empower conscious consumers by providing eco-friendly
                  alternatives that reduce waste, protect the planet, and
                  support sustainable brands.
                </p>
              </div>
            </div>

            {/* Right content: Highlights / Features */}
            <div className="md:w-1/2 space-y-6">
              <div className="bg-[#D6F7E7] rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Why Shop With Eco Life?
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Curated eco-friendly products you can trust</li>
                  <li>Support sustainable brands & initiatives</li>
                  <li>Zero-waste and reusable options for daily life</li>
                  <li>Easy online shopping for a greener lifestyle</li>
                </ul>
              </div>

              <div className="bg-[#D6F7E7] rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-2">Our Vision</h4>
                <p className="text-gray-600">
                  A world where every purchase makes a positive environmental
                  impact. We envision a future where sustainable shopping is the
                  norm, not the exception.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
