import { FC } from "react";
import moment from "moment";
import { FaFacebook, FaLinkedin, FaPhone } from "react-icons/fa";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Footer: FC = (): JSX.Element => {
  const year = moment().format("YYYY");

  return (
    <footer className="bg-secondary-color text-white relative">
      <div className="absolute -top-48 xl:-top-56 -right-[290px] xl:-right-[240px]  md:-top-52">
        <img src="/woman-globe.png" className="w-7/12" alt="" />
      </div>
      <div className="flex flex-col md:flex-row justify-between py-4 px-5">
        <div className="mt-10 md:mt-0">
          <h1 className="font-dancingScript text-4xl">EcoLife</h1>
          <div className="space-x-2 text-xl mt-8">
            <button>
              <FaFacebook />
            </button>
            <button>
              <AiFillInstagram />
            </button>
            <button>
              <FaLinkedin />
            </button>
            <button>
              <AiFillTwitterCircle />
            </button>
          </div>
          <p className="mt-4 md:mb-20">
            Follow on social media to stay updated
          </p>
        </div>
        <div className="mt-10">
          <h6>Contact us</h6>
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-5">
              <FaPhone />
              <p>+92 123456789</p>
            </div>
            <div className="flex items-center gap-4 mb-9">
              <MdEmail />
              <p>support@ecolife.com</p>
            </div>
            <div className="flex items-center gap-4">
              <FaLocationDot />
              <p className="max-w-[312px]">
                EcoLife Green HQ123 Greenway LaneSustainable City, ECO 123Earth
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 pb-2">
        <a href="#" className="text-xs">
          terms & services
        </a>
        <p className="text-xs"> Greenify © all rights reserved {year} </p>
      </div>
    </footer>
  );
};

export default Footer;
