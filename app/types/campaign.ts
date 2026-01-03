export interface CampaignData {
  id: string;
  name: string;
  brand_id: string;
  status: "active" | "paused" | "completed";
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
}

export interface CampaignInsights {
  campaign_id: string;
  campaign_name: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversion_rate: number;
  last_updated?: string;
  timestamp?: string;
}
