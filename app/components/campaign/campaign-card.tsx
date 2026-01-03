import React from "react";
import { IconType } from "react-icons";

interface CampaignCardProps {
  title: string;
  count: number;
  icon: IconType;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  onClick: () => void;
}

const CampaignCard = ({
  title,
  count,
  icon: Icon,
  iconColor,
  bgColor,
  borderColor,
  onClick,
}: CampaignCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`border ${borderColor} rounded-lg p-4 ${bgColor} hover:shadow-lg transition cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`text-sm font-medium ${iconColor
              .replace("text-", "text-")
              .replace("-500", "-700")}`}
          >
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{count}</p>
        </div>
        <Icon className={`text-4xl ${iconColor}`} />
      </div>
    </div>
  );
};

export default CampaignCard;
