"use client";

import React from "react";

interface StreamingToggleProps {
  isStreaming: boolean;
  onToggle: () => void;
}

const StreamingToggle: React.FC<StreamingToggleProps> = ({
  isStreaming,
  onToggle,
}) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
      <div className="flex-1">
        <p className="font-medium text-sm sm:text-base text-blue-900">
          Real-time Metrics Streaming
        </p>
        <p className="text-[10px] sm:text-xs text-blue-800 mt-1">
          {isStreaming
            ? "Streaming live metrics via Server-Sent Events"
            : "Click to enable live metric updates"}
        </p>
      </div>
      <button
        onClick={onToggle}
        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg font-medium transition whitespace-nowrap w-full sm:w-auto sm:ml-4 ${
          isStreaming
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-white text-blue-600 hover:bg-blue-100 border border-blue-200"
        }`}
      >
        {isStreaming ? "Stop Streaming" : "Start Streaming"}
      </button>
    </div>
  );
};

export default StreamingToggle;
