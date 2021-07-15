import React from "react";
import { theme } from "../../../config/theme/newTheme";

export const MsmesIcon = props => {
  return (
    <svg
      {...props}
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0)">
        <path
          d="M37.2126 32.5836C34.6877 30.2389 28.0748 28.4955 20.4399 28.4955C12.805 28.4955 6.19213 30.2389 3.66719 32.5836L2.5249 34.7478C2.5249 38.1745 10.5806 41 20.5 41C30.4193 41 38.475 38.1745 38.475 34.7478L37.2126 32.5836Z"
          fill={theme["primary-icon-color"]}
        />
        <path
          d="M37.2128 32.5836L20.4401 0L3.66724 32.5836C6.19218 30.2389 12.805 28.4955 20.4399 28.4955C28.0748 28.4955 34.6878 30.1789 37.2128 32.5836Z"
          fill={theme["secondary-icon-color"]}
        />
        <path
          d="M27 12.5L20.4398 0L14 12.5C15.8326 10.7983 24.5544 10.8085 27 12.5C27.0991 12.5685 26.9215 12.4252 27 12.5Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="41" height="41" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
