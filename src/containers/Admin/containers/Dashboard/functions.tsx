import React from "react";
import {
  BriefCase,
  BusinessSupportIcon,
  TrainingIcon,
  MarketAccessIcon,
  MsmesIcon,
  PolicyRegulationIcon,
  ResearchIcon,
  ResourcesIcon,
} from "../../../../components/svgs";

const tableHeader = (
  <div>
    <span>Newly Added</span>
  </div>
);

const ECOSYSTEM_SEGMENTS = {
  BUSINESS_SUPPORT: "business support",
  TRAINING: "training",
  FUNDING: "funding",
  MARKET_ACCESS: "market access",
  RESEARCH_AND_DEVELOPMENT: "research and development",
  POLICY_AND_REGULATION: "policy and regulation",
  RESOURCES: "resources",
  MSMES_AND_STARTUPS: "msmes and startups",
};

const generateIcons = (name, style?: React.CSSProperties) => {
  const {
    BUSINESS_SUPPORT,
    TRAINING,
    FUNDING,
    MARKET_ACCESS,
    RESEARCH_AND_DEVELOPMENT,
    POLICY_AND_REGULATION,
    RESOURCES,
    MSMES_AND_STARTUPS,
  } = ECOSYSTEM_SEGMENTS;

  switch (name) {
    case BUSINESS_SUPPORT:
      return <BusinessSupportIcon />;

    case TRAINING:
      return <TrainingIcon />;

    case FUNDING:
      return <BriefCase />;

    case MARKET_ACCESS:
      return <MarketAccessIcon />;

    case RESEARCH_AND_DEVELOPMENT:
      return <ResearchIcon />;

    case POLICY_AND_REGULATION:
      return <PolicyRegulationIcon />;

    case RESOURCES:
      return <ResourcesIcon />;

    case MSMES_AND_STARTUPS:
      return <MsmesIcon />;

    default:
      return <BriefCase />;
  }
};

const capitalize = str => {
  if (typeof str === "string") {
    return str.replace(/\b\w/g, c => c.toUpperCase());
  } else {
    return "";
  }
};

export { tableHeader, generateIcons, capitalize };
