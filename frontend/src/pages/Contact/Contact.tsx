import { FC } from "react";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Contact: FC = (): JSX.Element => {
  return (
    <section className="relative mt-10 mb-20 min-h-[calc(100vh-500px)] flex items-center">
      {/* Left decorative image */}
      <div className="absolute -z-30 -left-11 top-1/2 -translate-y-1/2">
        <img src="/left.png" alt="" className="max-w-60" />
      </div>

      {/* Main container */}
      <div className="w-full px-4">
        <div className="max-w-[1086px] mx-auto bg-[#D6F7E7] rounded-2xl px-4 md:px-20 py-8 md:py-16">
          <div className="bg-white rounded-2xl flex flex-col md:flex-row gap-8 p-6 md:p-12">
            {/* Left info */}
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                Contact Us
              </h2>
              <p className="text-gray-600">
                Have questions or want to collaborate? We’d love to hear from
                you.
              </p>

              <div className="space-y-2 text-gray-700">
                <p className="flex gap-2 items-center"><FaPhone /> +92 123 456 789</p>
                <p className="flex gap-2 items-center">  <MdEmail /> support@ecolife.com</p>
                <p className="flex gap-2 items-center">
                   <FaLocationDot /> EcoLife Green HQ <br />
                  123 Greenway Lane <br />
                  Sustainable City, ECO 123 <br />
                  Earth
                </p>
              </div>
            </div>

            {/* Right form */}
            <div className="md:w-1/2">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                ></textarea>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
