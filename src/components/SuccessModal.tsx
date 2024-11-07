// components/SuccessModal.tsx
import React from "react";
import Link from "next/link";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto z-10 relative">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h2>
        <p className="text-lg text-gray-700 mb-6">You have successfully registered. Welcome aboard!</p>
        <button
          onClick={onClose}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
