import React from "react";
import logo from "../images/logo.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black py-6">
      <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          {/* Left Section */}
          <div className="md:w-[316px]">
            <img src={logo} alt="Tuddles Logo" className="w-1/2 mb-3" />
            <p className="text-[14px] leading-snug text-white/80">
              At Tuddles, we believe pets aren't just animals — they're family.
              Our mission is to make pet parenting easier, happier, and
              healthier through vet support, pet products, and care services.
            </p>
            <div className="mt-3 flex gap-3 text-white">
              <a href="#">
                <FaFacebookF size={20} className="hover:text-blue-500" />
              </a>
              <a href="#">
                <FaInstagram size={20} className="hover:text-pink-500" />
              </a>
              <a href="#">
                <FaLinkedinIn size={20} className="hover:text-blue-400" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:w-[316px] flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <svg width={20} height={20} fill="white" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
              <div>
                <a
                  href="tel:+911800123444"
                  className="text-white font-medium text-[14px]">
                  +91 1800 123 444
                </a>
                <p className="text-white text-[12px]">Support Number</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg width={20} height={20} fill="white" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
              <div>
                <a
                  href="mailto:help@tuddles.com"
                  className="text-white font-medium text-[14px]">
                  help@tuddles.com
                </a>
                <p className="text-white text-[12px]">Support Email</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg width={20} height={20} fill="white" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
              <div>
                <p className="text-white font-medium text-[14px]">
                  Kolkata , West Bengal, India 700001
                </p>
                <p className="text-white text-[12px]">Address</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-4 md:w-[341px]">
            <div>
              <p className="text-white text-[16px] font-semibold mb-2">Pages</p>
              <div className="grid grid-cols-2 gap-y-1 text-[14px] text-white/80">
                <a className="hover:text-white" href="/">
                  Home
                </a>
                <a className="hover:text-white" href="/our-tutors">
                  News
                </a>
                <a className="hover:text-white" href="/contact">
                  Contact
                </a>
                <a className="hover:text-white" href="/plans-and-pricing">
                  Plans
                </a>
                <a className="hover:text-white" href="/terms-and-conditions">
                  Terms
                </a>
                <a className="hover:text-white" href="/privacy-policy">
                  Privacy
                </a>
              </div>
            </div>

            <div className="h-[56px] transition-transform duration-200 hover:scale-105">
              <p className="text-white text-[16px] font-semibold mb-2">
                Get the App
              </p>
              <div className="flex gap-3 items-center flex-wrap">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg"
                    alt="Google Play"
                    className="h-[56px]" // Increased height
                  />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg"
                    alt="App Store"
                    className="h-[56px]" // Increased height
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="mt-6 border-white/20" />
        <div className="flex items-center justify-center text-white text-[11px] pt-3">
          © 2025 Tuddles Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
