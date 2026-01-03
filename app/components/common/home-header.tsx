import React from "react";

const HomeHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Campaign Dashboard
            </h1>
            <p className="text-gray-600 text-sm">
              Monitor your campaign performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
