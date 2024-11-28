import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="mt-6 bg-gray-900 py-12 text-gray-300">
      <div className="container mx-auto flex flex-col items-center px-4 md:flex-row md:items-start md:justify-between">
        {/* Logo and Description */}
        <div className="mb-8 flex flex-col items-center text-center md:mb-0 md:w-1/3 md:items-start md:text-left">
          <Image
            src="https://github.com/shadcn.png"
            alt="School Logo"
            width={96}
            height={96}
            className="mb-4"
          />
          <p className="max-w-md text-sm">
            Welcome to the St Johns School Alumni Association, a vibrant
            community that brings together generations of proud graduates from
            St Johns School, Marhauli, Varanasi. Since its inception in 1963, St
            Johns School has been a beacon of academic excellence and holistic
            development, shaping the lives of countless students who have gone
            on to excel in various fields.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-8 text-center md:mb-0 md:w-1/4 md:text-left">
          <h3 className="mb-4 text-lg font-semibold text-yellow-500">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Members
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Gallery
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:w-1/3 md:text-left">
          <h3 className="mb-4 text-lg font-semibold text-yellow-500">
            Contact Us
          </h3>
          <ul className="space-y-2">
            <li className="flex flex-col items-center gap-2 md:flex-row md:items-start">
              <a href="mailto:sjsaa1999@gmail.com" className="break-all">
                📧 sjmaa1@gmail.com
              </a>
            </li>
            <li className="flex flex-col items-center gap-2 md:flex-row md:items-start">
              <a href="mailto:sjsaadlwvns@gmail.com" className="break-all">
                📧 sjmaa2@gmail.com
              </a>
            </li>
            <li className="flex flex-col items-center gap-2 md:flex-row md:items-start">
              <span className="text-center md:text-left">
                📍 School Off: Marhauli, Varanasi, Uttar Pradesh 221004, India
              </span>
            </li>
            <li className="flex flex-col items-center gap-2 md:flex-row md:items-start">
              <span className="text-center md:text-left">
                📍 Admin Off: Marhauli, Varanasi – 221001.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
