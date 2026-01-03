"use client";

import React from "react";
import { FiX } from "react-icons/fi";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

const Popup = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
}: PopupProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      style={{ backgroundColor: "rgba(61, 61, 60, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full sm:w-[95%] lg:w-[85%] xl:w-[80%] h-[95vh] sm:h-[90vh] shadow-2xl animate-in zoom-in-90 duration-300 ease-out flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-gray-100 border-b border-gray-300 shrink-0">
            {title && (
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition ml-auto cursor-pointer"
                aria-label="Close"
              >
                <FiX size={24} />
              </button>
            )}
          </div>
        )}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
