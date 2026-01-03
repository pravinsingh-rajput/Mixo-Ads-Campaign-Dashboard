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
          <button className="px-4 py-2 bg-slate-100 cursor-pointer hover:bg-slate-200 text-slate-700 font-medium rounded border border-slate-300 transition">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
