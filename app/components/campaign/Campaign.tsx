"use client";

import React, { useEffect, useState, useMemo } from "react";
import { CampaignData, CampaignInsights } from "@/app/types/campaign";
import { API_BASE_URL } from "@/app/utils/constants";
import { FiCheck, FiPause, FiZap } from "react-icons/fi";
import { ColumnDef } from "@tanstack/react-table";
import CampaignCard from "./campaign-card";
import Popup from "../common/popup";
import DataTable from "../common/data-table";
import CampaignDetailsTable from "./campaign-details-table";
import CampaignMetricsGrid from "./campaign-metrics-grid";
import StreamingToggle from "./streaming-toggle";
import PerformanceMetricsOverview from "./performance-metrics-overview";

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
  const [showTable, setShowTable] = useState(true);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);
  const [campaignsLoading, setCampaignsLoading] = useState(false);
  const [selectedCampaignDetail, setSelectedCampaignDetail] =
    useState<CampaignData | null>(null);
  const [campaignInsights, setCampaignInsights] =
    useState<CampaignInsights | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    fetchInsights();
    fetchCampaigns();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  const fetchInsights = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}campaigns/insights`);
      const data = await response.json();
      setInsights(data.insights);
    } catch {
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
    } catch {
      // Handle error silently
    } finally {
      setCampaignsLoading(false);
    }
  };

  const fetchCampaignDetails = async (campaignId: string) => {
    setDetailsLoading(true);
    setSelectedCampaignDetail({ id: campaignId } as CampaignData);
    setInsightsLoading(true);

    try {
      const detailsRes = await fetch(`${API_BASE_URL}campaigns/${campaignId}`);
      const detailsData = await detailsRes.json();
      setSelectedCampaignDetail(detailsData.campaign);
      setDetailsLoading(false);

      const insightsRes = await fetch(
        `${API_BASE_URL}campaigns/${campaignId}/insights`
      );
      const insightsData = await insightsRes.json();
      setCampaignInsights(insightsData.insights);
      setInsightsLoading(false);

      const eventSource = new EventSource(
        `${API_BASE_URL}campaigns/${campaignId}/insights/stream`
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const insights = data.insights || data;
        setCampaignInsights(insights);
      };

      eventSource.onerror = () => {
        eventSource.close();
      };

      setEventSource(eventSource);
    } catch {
      setDetailsLoading(false);
      setInsightsLoading(false);
    }
  };

  const fetchInsightsFallback = async () => {
    if (!selectedCampaignDetail) return;
    setInsightsLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}campaigns/${selectedCampaignDetail.id}/insights`
      );
      const data = await res.json();
      setCampaignInsights(data.insights);
    } catch {
      // swallow
    } finally {
      setInsightsLoading(false);
    }
  };

  const toggleStreaming = () => {
    if (streaming) {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
      setStreaming(false);
    } else {
      if (!selectedCampaignDetail) return;
      setStreaming(true);

      const es = new EventSource(
        `${API_BASE_URL}campaigns/${selectedCampaignDetail.id}/insights/stream`
      );

      es.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const insights = data.insights || data;
        setCampaignInsights(insights);
      };

      es.onerror = () => {
        es.close();
        setStreaming(false);
      };

      setEventSource(es);
    }
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
    if (!campaigns || campaigns.length === 0) return [];
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

  const getStatusSample = (status: FilterType) => {
    if (!campaigns || campaigns.length === 0) return [];
    const list =
      status === "all"
        ? campaigns
        : campaigns.filter((campaign) => campaign.status === status);
    return list.slice(0, 3).map((campaign) => ({
      id: campaign.id,
      name: campaign.name,
    }));
  };

  const handleCampaignNameClick = async (
    campaignId: string,
    status: FilterType
  ) => {
    setFilterType(status);
    setShowTable(true);
    await fetchCampaignDetails(campaignId);
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
          <p className="font-semibold text-gray-900">
            {info.getValue() as string}
          </p>
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
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <button
            onClick={async () => {
              await fetchCampaignDetails(info.row.original.id);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition"
          >
            View Details
          </button>
        ),
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <CampaignCard
          title="Active Campaigns"
          count={insights?.active_campaigns || 0}
          icon={FiZap}
          iconColor="text-green-500"
          bgColor="bg-green-50/60"
          borderColor="border-green-300"
          samples={getStatusSample("active")}
          onSampleClick={(id) => handleCampaignNameClick(id, "active")}
        />
        <CampaignCard
          title="Paused Campaigns"
          count={insights?.paused_campaigns || 0}
          icon={FiPause}
          iconColor="text-yellow-500"
          bgColor="bg-yellow-50/60"
          borderColor="border-yellow-300"
          samples={getStatusSample("paused")}
          onSampleClick={(id) => handleCampaignNameClick(id, "paused")}
        />
        <CampaignCard
          title="Completed Campaigns"
          count={insights?.completed_campaigns || 0}
          icon={FiCheck}
          iconColor="text-gray-500"
          bgColor="bg-gray-50"
          borderColor="border-gray-300"
          samples={getStatusSample("completed")}
          onSampleClick={(id) => handleCampaignNameClick(id, "completed")}
        />
      </div>

      <PerformanceMetricsOverview insights={insights} />

      {showTable && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {getPopupTitle()}
          </h3>
          {campaignsLoading ? (
            <div className="space-y-3">
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
        </div>
      )}

      <Popup
        isOpen={!!selectedCampaignDetail}
        onClose={() => {
          if (eventSource) {
            eventSource.close();
            setEventSource(null);
          }
          setSelectedCampaignDetail(null);
          setCampaignInsights(null);
          setFilterType("all");
        }}
        title={selectedCampaignDetail?.name || "Campaign Details"}
      >
        {detailsLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          selectedCampaignDetail && (
            <div className="p-6 space-y-6">
              <div className="flex gap-8">
                <CampaignDetailsTable
                  campaign={selectedCampaignDetail}
                  getStatusColor={getStatusColor}
                />
                <div className="flex-[1.5] min-w-0">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    Performance Metrics
                  </h4>
                  <CampaignMetricsGrid
                    insights={campaignInsights}
                    isLoading={insightsLoading}
                    onRetry={fetchInsightsFallback}
                  />
                  <p className="text-xs text-gray-500 mt-4">
                    Last Updated:{" "}
                    {campaignInsights &&
                      new Date(
                        campaignInsights.last_updated ??
                          campaignInsights.timestamp ??
                          new Date().toISOString()
                      ).toLocaleString()}
                  </p>
                </div>
              </div>
              <StreamingToggle
                isStreaming={streaming}
                onToggle={toggleStreaming}
              />
            </div>
          )
        )}
      </Popup>
    </div>
  );
};

export default Campaign;
