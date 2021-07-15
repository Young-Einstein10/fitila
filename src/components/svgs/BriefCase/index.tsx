import React from "react";
import { theme } from "../../../config/theme/newTheme";

export const BriefCase = props => {
  return (
    <svg
      {...props}
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0)">
        <path
          d="M14.8142 5.37257H23.2731V7.43011H26.0165V5.37257C26.0165 3.81799 24.8277 2.62915 23.2731 2.62915H14.8142C13.2596 2.62915 12.0708 3.81799 12.0708 5.37257V7.43011H14.8142V5.37257Z"
          fill="black"
        />
        <path
          d="M23.6389 21.4673V22.2446C23.6389 23.022 23.0445 23.6163 22.2672 23.6163H15.7745C14.9971 23.6163 14.4028 23.0219 14.4028 22.2446V21.4673H2.05737V33.2182C2.05737 34.7728 3.24621 35.9616 4.80079 35.9616H33.7896C35.3442 35.9616 36.533 34.7728 36.533 33.2182V21.4673H23.6389Z"
          fill="#FFDEC6"
        />
        <path
          d="M37.219 7.20152H26.0167H23.2733H14.8144H12.071H1.37167C0.594421 7.20152 0 7.79594 0 8.57319V20.5528C0 21.3301 0.594421 21.9245 1.37167 21.9245H2.05754H14.4029V18.4037C14.4029 17.6264 14.9973 17.032 15.7746 17.032H22.2673C23.0447 17.032 23.639 17.6265 23.639 18.4037V21.9245H36.5331H37.219C37.9963 21.9245 38.5906 21.33 38.5906 20.5528V8.57319C38.5907 7.79594 37.9963 7.20152 37.219 7.20152Z"
          fill={theme["secondary-icon-color"]}
        />
        <path
          d="M14.8602 24.5308H23.1819C23.9592 24.5308 24.5536 23.9363 24.5536 23.1591V21.9246V17.9466C24.5536 17.1693 23.9592 16.575 23.1819 16.575H14.8602C14.0829 16.575 13.4885 17.1694 13.4885 17.9466V21.9246V23.1591C13.4884 23.9363 14.0829 24.5308 14.8602 24.5308Z"
          fill={theme["primary-icon-color"]}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="38.5907" height="38.5907" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
