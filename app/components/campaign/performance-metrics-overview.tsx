"use client";

import React from "react";
import { FiEye, FiMousePointer, FiDollarSign, FiTarget } from "react-icons/fi";

interface PerformanceMetricsOverviewProps {
  insights: {
    total_impressions: number;
    total_clicks: number;
    total_conversions: number;
    total_spend: number;
    avg_ctr: number;
    avg_cpc: number;
    avg_conversion_rate: number;
  } | null;
}

const PerformanceMetricsOverview: React.FC<PerformanceMetricsOverviewProps> = ({
  insights,
}) => {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
        Performance Metrics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="border border-gray-300 rounded-lg p-3 sm:p-4 bg-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <FiEye className="text-2xl sm:text-3xl text-purple-500" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Impressions
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {insights?.total_impressions.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-3 sm:p-4 bg-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <FiMousePointer className="text-2xl sm:text-3xl text-blue-500" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Clicks
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {insights?.total_clicks.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-3 sm:p-4 bg-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <FiTarget className="text-2xl sm:text-3xl text-green-500" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Conversions
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {insights?.total_conversions.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-3 sm:p-4 bg-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <FiDollarSign className="text-2xl sm:text-3xl text-red-500" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Spend
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                ${insights?.total_spend.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-3 sm:p-4 bg-white">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              Average CTR
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {insights?.avg_ctr || 0}%
            </p>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-3 sm:p-4 bg-white">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              Average CPC
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              ${insights?.avg_cpc || 0}
            </p>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-3 sm:p-4 bg-white">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              Avg Conversion Rate
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {insights?.avg_conversion_rate || 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetricsOverview;
