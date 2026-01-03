"use client";

import React, { useEffect, useState, useMemo } from "react";
import { CampaignData } from "@/app/types/campaign";
import { API_BASE_URL } from "@/app/utils/constants";
import {
  FiCheck,
  FiPause,
  FiTrendingUp,
  FiZap,
  FiEye,
  FiMousePointer,
  FiDollarSign,
  FiTarget,
} from "react-icons/fi";
import { ColumnDef } from "@tanstack/react-table";
import CampaignCard from "./campaign-card";
import Popup from "../common/popup";
import DataTable from "../common/data-table";

type FilterType = "all" | "active" | "paused" | "completed";

interface Insights {
  timestamp: string;
  total_campaigns: number;
  active_campaigns: number;
  paused_campaigns: number;
  completed_campaigns: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  total_spend: number;
  avg_ctr: number;
  avg_cpc: number;
  avg_conversion_rate: number;
}

const Campaign = () => {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [showListPopup, setShowListPopup] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);
  const [campaignsLoading, setCampaignsLoading] = useState(false);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}campaigns/insights`);
      const data = await response.json();
      setInsights(data.insights);
    } catch (error) {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaigns = async () => {
    setCampaignsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}campaigns`);
      const data = await response.json();
      setCampaigns(data.campaigns);
    } catch (error) {
      // Handle error silently
    } finally {
      setCampaignsLoading(false);
    }
  };

  const handleCardClick = (type: FilterType) => {
    setFilterType(type);
    setShowListPopup(true);
    fetchCampaigns();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFilteredCampaigns = () => {
    if (filterType === "all") return campaigns;
    return campaigns.filter((c) => c.status === filterType);
  };

  const getPopupTitle = () => {
    switch (filterType) {
      case "all":
        return "All Campaigns";
      case "active":
        return "Active Campaigns";
      case "paused":
        return "Paused Campaigns";
      case "completed":
        return "Completed Campaigns";
    }
  };

  const columns = useMemo<ColumnDef<CampaignData>[]>(
    () => [
      {
        accessorKey: "created_at",
        header: "Created",
        cell: (info) => (
          <span className="text-gray-600">
            {new Date(info.getValue() as string).toLocaleDateString()}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Campaign Name",
        cell: (info) => (
          <div>
            <p className="font-semibold text-gray-900">
              {info.getValue() as string}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "brand_id",
        header: "Brand ID",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "budget",
        header: "Budget",
        cell: (info) => (
          <span className="font-medium">
            ${(info.getValue() as number).toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "daily_budget",
        header: "Daily",
        cell: (info) => <span>${info.getValue() as number}</span>,
      },
      {
        accessorKey: "platforms",
        header: "Platform",
        cell: (info) => {
          const platforms = info.getValue() as string[];
          return <span className="text-gray-600">{platforms.join(", ")}</span>;
        },
      },
    ],
    []
  );

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Campaigns Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border border-gray-300 rounded-lg p-6 bg-gray-100 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-3"></div>
                  <div className="h-8 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border border-gray-300 rounded-lg p-6 bg-gray-100 animate-pulse"
            >
              <div className="h-4 bg-gray-300 rounded w-32 mb-3"></div>
              <div className="h-8 bg-gray-300 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Campaigns Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <CampaignCard
          title="Total Campaigns"
          count={insights?.total_campaigns || 0}
          icon={FiTrendingUp}
          iconColor="text-blue-500"
          bgColor="bg-gray-100"
          borderColor="border-gray-300"
          onClick={() => handleCardClick("all")}
        />
        <CampaignCard
          title="Active Campaigns"
          count={insights?.active_campaigns || 0}
          icon={FiZap}
          iconColor="text-green-500"
          bgColor="bg-green-50/60"
          borderColor="border-green-300"
          onClick={() => handleCardClick("active")}
        />
        <CampaignCard
          title="Paused Campaigns"
          count={insights?.paused_campaigns || 0}
          icon={FiPause}
          iconColor="text-yellow-500"
          bgColor="bg-yellow-50/60"
          borderColor="border-yellow-300"
          onClick={() => handleCardClick("paused")}
        />
        <CampaignCard
          title="Completed Campaigns"
          count={insights?.completed_campaigns || 0}
          icon={FiCheck}
          iconColor="text-gray-500"
          bgColor="bg-gray-50"
          borderColor="border-gray-300"
          onClick={() => handleCardClick("completed")}
        />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Performance Metrics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="flex items-center gap-3">
            <FiEye className="text-3xl text-purple-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Impressions
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {insights?.total_impressions.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="flex items-center gap-3">
            <FiMousePointer className="text-3xl text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900">
                {insights?.total_clicks.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="flex items-center gap-3">
            <FiTarget className="text-3xl text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Conversions
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {insights?.total_conversions.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="flex items-center gap-3">
            <FiDollarSign className="text-3xl text-red-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spend</p>
              <p className="text-2xl font-bold text-gray-900">
                ${insights?.total_spend.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div>
            <p className="text-sm font-medium text-gray-600">Average CTR</p>
            <p className="text-2xl font-bold text-gray-900">
              {insights?.avg_ctr || 0}%
            </p>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div>
            <p className="text-sm font-medium text-gray-600">Average CPC</p>
            <p className="text-2xl font-bold text-gray-900">
              ${insights?.avg_cpc || 0}
            </p>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Avg Conversion Rate
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {insights?.avg_conversion_rate || 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Campaign List Popup */}
      <Popup
        isOpen={showListPopup}
        onClose={() => setShowListPopup(false)}
        title={getPopupTitle()}
      >
        {campaignsLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <DataTable data={getFilteredCampaigns()} columns={columns} />
        )}
      </Popup>
    </div>
  );
};

export default Campaign;
