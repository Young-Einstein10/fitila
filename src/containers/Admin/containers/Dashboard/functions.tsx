import React from "react";
import { ECOSYSTEM_SEGMENTS } from "../../../../redux/constants";
import { ReactComponent as BriefCase } from "../../../../static/svg/briefcase.svg";
import { ReactComponent as BusinessSupportIcon } from "../../../../static/svg/business_support_icon.svg";
import { ReactComponent as TrainingIcon } from "../../../../static/svg/training.svg";
import { ReactComponent as MarketAccessIcon } from "../../../../static/svg/funnel.svg";
import { ReactComponent as PolicyRegulationIcon } from "../../../../static/svg/policyreg.svg";
import { ReactComponent as RescourcesIcon } from "../../../../static/svg/resources.svg";
import { ReactComponent as ResearchIcon } from "../../../../static/svg/research.svg";
import { ReactComponent as MSMEsIcon } from "../../../../static/svg/cone.svg";

const tableHeader = (
  <div>
    <span>Newly Added</span>
  </div>
);

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
      return <BusinessSupportIcon style={{ ...style }} />;

    case TRAINING:
      return <TrainingIcon style={{ ...style }} />;

    case FUNDING:
      return <BriefCase style={{ ...style }} />;

    case MARKET_ACCESS:
      return <MarketAccessIcon style={{ ...style }} />;

    case RESEARCH_AND_DEVELOPMENT:
      return <ResearchIcon style={{ ...style }} />;

    case POLICY_AND_REGULATION:
      return <PolicyRegulationIcon style={{ ...style }} />;

    case RESOURCES:
      return <RescourcesIcon style={{ ...style }} />;

    case MSMES_AND_STARTUPS:
      return <MSMEsIcon style={{ ...style }} />;

    default:
      return <BriefCase style={{ ...style }} />;
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
