"use client";

import React from "react";
import { CampaignData } from "@/app/types/campaign";

interface CampaignDetailsTableProps {
  campaign: CampaignData;
  getStatusColor: (status: string) => string;
}

const CampaignDetailsTable: React.FC<CampaignDetailsTableProps> = ({
  campaign,
  getStatusColor,
}) => {
  return (
    <div className="flex-1 min-w-0">
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="border-r border-gray-300 p-3 bg-gray-50 text-sm font-medium text-gray-700 w-1/3">
              Campaign ID
            </td>
            <td className="p-3 text-sm text-gray-900">{campaign.id}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="border-r border-gray-300 p-3 bg-gray-50 text-sm font-medium text-gray-700">
              Brand ID
            </td>
            <td className="p-3 text-sm text-gray-900">{campaign.brand_id}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="border-r border-gray-300 p-3 bg-gray-50 text-sm font-medium text-gray-700">
              Status
            </td>
            <td className="p-3">
              <span
                className={`inline-block px-3 py-1 rounded text-sm font-medium ${getStatusColor(
                  campaign.status
                )}`}
              >
                {campaign.status}
              </span>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="border-r border-gray-300 p-3 bg-gray-50 text-sm font-medium text-gray-700">
              Created
            </td>
            <td className="p-3 text-sm text-gray-900">
              {new Date(campaign.created_at).toLocaleDateString()}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="border-r border-gray-300 p-3 bg-gray-50 text-sm font-medium text-gray-700">
              Budget
            </td>
            <td className="p-3 text-sm font-semibold text-gray-900">
              ${campaign.budget.toLocaleString()}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="border-r border-gray-300 p-3 bg-gray-50 text-sm font-medium text-gray-700">
              Daily Budget
            </td>
            <td className="p-3 text-sm font-semibold text-gray-900">
              ${campaign.daily_budget}
            </td>
          </tr>
          <tr>
            <td className="border-r border-gray-300 p-3 bg-gray-50 text-sm font-medium text-gray-700">
              Platforms
            </td>
            <td className="p-3">
              <div className="flex gap-2 flex-wrap">
                {campaign.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CampaignDetailsTable;
