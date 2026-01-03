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
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
      <div>
        <p className="font-medium text-blue-900">Real-time Metrics Streaming</p>
        <p className="text-xs text-blue-800 mt-1">
          {isStreaming
            ? "Streaming live metrics via Server-Sent Events"
            : "Click to enable live metric updates"}
        </p>
      </div>
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ml-4 ${
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
