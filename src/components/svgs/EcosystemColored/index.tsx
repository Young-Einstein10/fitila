import React from "react";
import { theme } from "../../../config/theme/newTheme";

export const EcosystemColored = props => {
  return (
    <svg
      {...props}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" fill="#FFF4EC" />
      <rect
        x="29"
        y="32"
        width="36"
        height="36"
        fill={theme["primary-icon-color"]}
      />
      <rect
        width="26"
        height="3"
        transform="matrix(1 0 0 -1 34 32)"
        fill={theme["secondary-icon-color"]}
      />
      <rect
        x="42"
        y="45"
        width="30"
        height="23"
        fill={theme["secondary-icon-color"]}
      />
      <rect
        width="57"
        height="3"
        transform="matrix(1 0 0 -1 22 71)"
        fill={theme["secondary-icon-color"]}
      />
      <rect x="42" y="49" width="5" height="2" fill="black" />
      <rect x="42" y="53" width="5" height="2" fill="black" />
      <rect x="42" y="57" width="5" height="2" fill="black" />
      <rect x="55" y="59" width="10" height="9" fill="black" />
    </svg>
  );
};
