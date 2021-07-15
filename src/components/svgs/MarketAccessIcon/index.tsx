import React from "react";
import { theme } from "../../../config/theme/newTheme";

export const MarketAccessIcon = props => {
  return (
    <svg
      {...props}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.2812 1.07054C35.0526 0.613342 34.5953 0.338974 34.0466 0.338974H1.39994C0.89698 0.338974 0.439787 0.613342 0.165418 1.07054C-0.10895 1.52773 -0.0174938 2.07646 0.256875 2.48797L12.5565 20.2287V33.7171C12.5565 34.4945 13.151 35.0888 13.9282 35.0888H21.5184C22.2957 35.0888 22.89 34.4944 22.89 33.7171V20.2287L35.1897 2.48797C35.464 2.07646 35.5097 1.52773 35.2812 1.07054Z"
        fill={theme["secondary-icon-color"]}
      />
    </svg>
  );
};
