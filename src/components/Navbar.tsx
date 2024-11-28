"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OTPLoginPopup from "./OTPLogin";
import VerifyOTP from "./VerifyOTP";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOTPLoginOpen, setIsOTPLoginOpen] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/members", label: "Members" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
  ];

  const handleLoginSuccess = () => {
    // Close verification popup and redirect to home
    setVerifyOtp(false);
    setIsOTPLoginOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 mb-2 w-full bg-blue-900 shadow-xl">
        <div className="mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            {/* Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              width="32"
              viewBox="0 -960 960 960"
              fill="#ffffff"
            >
              <path d="M160-120v-375l-72 55-48-64 120-92v-124h80v63l240-183 440 336-48 63-72-54v375H160Zm80-80h200v-160h80v160h200v-356L480-739 240-556v356Zm-80-560q0-50 35-85t85-35q17 0 28.5-11.5T320-920h80q0 50-35 85t-85 35q-17 0-28.5 11.5T240-760h-80Zm80 560h480-480Z" />
            </svg>
            <p className="ml-1 text-xs font-bold text-white md:text-lg">
              SJMAA
            </p>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white hover:text-gray-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            <button
              onClick={() => setIsOTPLoginOpen(true)}
              className="rounded-md bg-white px-4 py-2 text-sm text-blue-900 hover:bg-gray-100"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-800"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X/>
               
              ) : (
                <Menu/>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 top-16 z-10 w-full bg-blue-900 px-2 pb-3 pt-2 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-white"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setIsOTPLoginOpen(true)}
              className="block w-full px-3 py-2 text-left text-white"
            >
              Log-in
            </button>
          </div>
        )}
      </nav>

      {/* OTP Login Popup */}
      {isOTPLoginOpen && (
        <OTPLoginPopup
          onClose={() => setIsOTPLoginOpen(false)}
          handleOTPRequest={() => setVerifyOtp(true)}
        />
      )}

      {/* OTP Verification Popup */}
      {verifyOtp && (
        <VerifyOTP
          onClose={() => setVerifyOtp(false)}
          handleOTPRequest={handleLoginSuccess} // Call handleLoginSuccess on OTP verification success
        />
      )}
    </>
  );
};

export default Navbar;
