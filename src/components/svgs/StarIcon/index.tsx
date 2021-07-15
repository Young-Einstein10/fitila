import React from "react";
import { theme } from "../../../config/theme/newTheme";

export const StarIcon = props => {
  return (
    <svg
      {...props}
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="17"
        cy="17"
        r="16"
        stroke={theme["secondary-icon-color"]}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.8454 10L18.9607 14.2852L23.6909 14.9766L20.2681 18.3103L21.0759 23.02L16.8454 20.7952L12.615 23.02L13.4227 18.3103L10 14.9766L14.7302 14.2852L16.8454 10Z"
        stroke={theme["secondary-icon-color"]}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
