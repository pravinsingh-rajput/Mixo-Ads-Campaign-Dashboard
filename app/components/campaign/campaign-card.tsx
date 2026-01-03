import React from "react";
import { IconType } from "react-icons";

interface CampaignCardProps {
  title: string;
  count: number;
  icon: IconType;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  onClick?: () => void;
  samples?: { id: string; name: string }[];
  onSampleClick?: (id: string) => void;
}

const CampaignCard = ({
  title,
  count,
  icon: Icon,
  iconColor,
  bgColor,
  borderColor,
  onClick,
  samples,
  onSampleClick,
}: CampaignCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`border ${borderColor} rounded-lg p-3 sm:p-4 ${bgColor} hover:shadow-lg transition ${
        onClick ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`text-xs sm:text-sm font-medium ${iconColor
              .replace("text-", "text-")
              .replace("-500", "-700")}`}
          >
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
            {count}
          </p>
        </div>
        <Icon className={`text-3xl sm:text-4xl ${iconColor}`} />
      </div>

      {samples && samples.length > 0 ? (
        <div className="mt-3 flex flex-col gap-1">
          {samples.map((sample) => (
            <button
              key={sample.id}
              onClick={(e) => {
                e.stopPropagation();
                onSampleClick?.(sample.id);
              }}
              className="text-xs cursor-pointer text-blue-700 hover:underline text-left block"
            >
              {sample.name}
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-xs text-gray-500">No campaigns yet</p>
      )}
    </div>
  );
};

export default CampaignCard;
