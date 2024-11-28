"use client";
import { useState } from "react";

interface VerifyOTPProps {
  onClose: () => void;
  handleOTPRequest: () => void;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ onClose,handleOTPRequest }) => {
  const [otp, setOtp] = useState("");

 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Login with OTP
        </h2>
        <input
          type="number"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="mb-4 w-full rounded-md border border-gray-300 p-2"
        />
        <button
          onClick={handleOTPRequest}
          className="mb-2 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Verify OTP
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full text-sm text-blue-600 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
