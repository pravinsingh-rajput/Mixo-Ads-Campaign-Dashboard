"use client";

import React from "react";
import { FiEye, FiMousePointer, FiDollarSign, FiTarget } from "react-icons/fi";
import { CampaignInsights } from "@/app/types/campaign";

interface CampaignMetricsGridProps {
  insights: CampaignInsights | null;
  isLoading: boolean;
  onRetry: () => void;
}

const CampaignMetricsGrid: React.FC<CampaignMetricsGridProps> = ({
  insights,
  isLoading,
  onRetry,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div
            key={i}
            className="border border-gray-300 rounded-lg p-4 bg-gray-100 h-20 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="text-center py-8 text-gray-500 space-y-3">
        <p>No insights data available.</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition"
        >
          Retry fetching insights
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <div className="flex items-center gap-3">
          <FiEye className="text-2xl text-purple-500" />
          <div>
            <p className="text-xs font-medium text-gray-600">Impressions</p>
            <p className="text-lg font-bold text-gray-900">
              {insights.impressions.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <div className="flex items-center gap-3">
          <FiMousePointer className="text-2xl text-blue-500" />
          <div>
            <p className="text-xs font-medium text-gray-600">Clicks</p>
            <p className="text-lg font-bold text-gray-900">
              {insights.clicks.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <div className="flex items-center gap-3">
          <FiTarget className="text-2xl text-green-500" />
          <div>
            <p className="text-xs font-medium text-gray-600">Conversions</p>
            <p className="text-lg font-bold text-gray-900">
              {insights.conversions.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <div className="flex items-center gap-3">
          <FiDollarSign className="text-2xl text-red-500" />
          <div>
            <p className="text-xs font-medium text-gray-600">Spend</p>
            <p className="text-lg font-bold text-gray-900">
              ${insights.spend.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <p className="text-xs font-medium text-gray-600">CTR</p>
        <p className="text-lg font-bold text-gray-900">{insights.ctr}%</p>
      </div>
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <p className="text-xs font-medium text-gray-600">CPC</p>
        <p className="text-lg font-bold text-gray-900">${insights.cpc}</p>
      </div>
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <p className="text-xs font-medium text-gray-600">Conversion Rate</p>
        <p className="text-lg font-bold text-gray-900">
          {insights.conversion_rate}%
        </p>
      </div>
    </div>
  );
};

export default CampaignMetricsGrid;
