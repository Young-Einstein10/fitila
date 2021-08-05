import React from "react";
import { theme } from "../../../config/theme/newTheme";

export const HandbagIcon = props => {
  return (
    <svg
      {...props}
      width="28"
      height="33"
      viewBox="0 0 28 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.545 13.5455C26.545 23.303 13.9996 31.6667 13.9996 31.6667C13.9996 31.6667 1.4541 23.303 1.4541 13.5455C1.4541 10.2182 2.77585 7.02721 5.12858 4.67448C7.48131 2.32175 10.6723 1 13.9996 1C17.3268 1 20.5178 2.32175 22.8705 4.67448C25.2233 7.02721 26.545 10.2182 26.545 13.5455Z"
        stroke={theme["secondary-icon-color"]}
        strokeWidth="1.25455"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9999 17.7273C16.3095 17.7273 18.1818 15.855 18.1818 13.5455C18.1818 11.2359 16.3095 9.36364 13.9999 9.36364C11.6904 9.36364 9.81812 11.2359 9.81812 13.5455C9.81812 15.855 11.6904 17.7273 13.9999 17.7273Z"
        stroke={theme["secondary-icon-color"]}
        strokeWidth="1.25455"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
