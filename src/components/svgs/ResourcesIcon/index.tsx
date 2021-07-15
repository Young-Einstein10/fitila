import React from "react";
import { theme } from "../../../config/theme/newTheme";

export const ResourcesIcon = props => {
  return (
    <svg
      {...props}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.7884 21.4447V11.7105V6.91761L14.8237 0.98819L11.859 6.91761V12.847V20.3576C13.539 20.8517 15.5648 21.247 17.7884 21.4447Z"
        fill="black"
      />
      <path
        d="M31.13 20.0118V13.1929V5.92942V0H25.2006V5.92942V11.8094V21.3459C27.4735 21.0988 29.4994 20.6047 31.13 20.0118Z"
        fill={theme["primary-icon-color"]}
      />
      <path
        d="M34.8346 16.1081C34.8346 14.774 33.451 13.5881 31.1287 12.6987V19.5175C33.451 18.6281 34.8346 17.4422 34.8346 16.1081Z"
        fill={theme["secondary-icon-color"]}
      />
      <path
        d="M11.8583 19.8633V12.3528H11.7595C8.94299 13.2917 7.16418 14.6258 7.16418 16.1081C7.16418 17.5904 8.99246 18.9246 11.8583 19.8633Z"
        fill={theme["secondary-icon-color"]}
      />
      <path
        d="M21 21.0987C22.4823 21.0987 23.8658 20.9999 25.1999 20.8517V11.3152H25.1011C23.8164 11.167 22.4329 11.0682 21 11.0682C19.9129 11.0682 18.8258 11.1175 17.7882 11.2164V20.9504C18.8258 21.0493 19.9129 21.0987 21 21.0987Z"
        fill={theme["secondary-icon-color"]}
      />
      <path
        d="M34.1924 30.0916C34.0442 30.2398 33.8959 30.3881 33.7477 30.5363C33.6489 30.6351 33.5501 30.6845 33.4512 30.734C33.2536 30.8822 33.0559 31.0305 32.8089 31.1787C32.216 31.5245 31.5241 31.821 30.783 32.1175C30.4865 32.2164 30.1407 32.3152 29.7948 32.4634C28.4112 32.8587 26.8301 33.2046 25.1006 33.3528C24.6559 33.4022 24.2112 33.4516 23.7665 33.4516C22.8771 33.5505 21.9383 33.5998 20.9995 33.5998C13.3406 33.5998 7.16418 31.3763 7.16418 28.5598V37.0092C7.16418 39.7763 13.3406 41.9998 20.9995 41.9998C28.6584 41.9998 34.8348 39.7763 34.8348 37.0092V28.6093C34.8348 28.7575 34.8348 28.9551 34.7854 29.1033C34.7361 29.3504 34.5878 29.5974 34.4396 29.8445C34.3406 29.9434 34.2913 30.0422 34.1924 30.0916Z"
        fill={theme["secondary-icon-color"]}
      />
      <path
        d="M34.8352 16.1082C34.8352 17.4423 33.4516 18.6282 31.1293 19.5176C29.4987 20.1105 27.4728 20.6047 25.1998 20.8517C23.8657 20.9999 22.4822 21.0988 20.9999 21.0988C19.9128 21.0988 18.8257 21.0494 17.7881 20.9506C15.5646 20.8024 13.5387 20.407 11.8587 19.8635C8.99282 18.9246 7.16455 17.5905 7.16455 16.1082V29.0541C7.16455 31.8706 13.341 34.0941 20.9999 34.0941C21.9387 34.0941 22.8775 34.0448 23.8164 33.9953C24.2611 33.9459 24.7058 33.9459 25.1505 33.8965C26.8799 33.6988 28.4611 33.4024 29.8446 33.0071C30.1905 32.9082 30.5364 32.8094 30.8329 32.6612C31.6234 32.3647 32.3152 32.0683 32.8587 31.7223C33.1057 31.5741 33.3034 31.4258 33.5011 31.2776C33.5999 31.2283 33.6987 31.1294 33.7976 31.08C33.9952 30.9318 34.1434 30.7835 34.2423 30.6353C34.2916 30.5364 34.3905 30.4871 34.4399 30.3882C34.5881 30.1412 34.7364 29.8942 34.7858 29.647C34.8352 29.4988 34.8352 29.3012 34.8352 29.153V16.1082Z"
        fill={theme["secondary-icon-color"]}
      />
    </svg>
  );
};
