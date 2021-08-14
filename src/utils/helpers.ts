import { IOrganizationProps } from "../context/Organization/types";

export const numberWithCommas = num => {
  if (!num || num === undefined) return;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getTotalFunding = (arr: IOrganizationProps[]) => {
  return arr.reduce(
    (total, org) => Number(org.funding ? org.funding : 20000) + total,
    0
  );
};

export const capitalize = str => {
  if (typeof str === "string") {
    return str.replace(/\b\w/g, c => c.toUpperCase());
  } else {
    return "";
  }
};

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Custom Tooltip
export const customTooltips = function(tooltip) {
  // Tooltip Element
  let tooltipEl: HTMLElement = document.querySelector(".chartjs-tooltip");

  if (!this._chart.canvas.closest(".parentContainer").contains(tooltipEl)) {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table></table>";

    document.querySelectorAll(".parentContainer").forEach(el => {
      if (el.contains(document.querySelector(".chartjs-tooltip"))) {
        document.querySelector(".chartjs-tooltip").remove();
      }
    });

    this._chart.canvas.closest(".parentContainer").appendChild(tooltipEl);
  }

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove("above", "below", "no-transform");
  if (tooltip.yAlign) {
    tooltipEl.classList.add(tooltip.yAlign);
  } else {
    tooltipEl.classList.add("no-transform");
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(getBody);

    let innerHtml = "<thead>";

    titleLines.forEach(function(title) {
      innerHtml += `<div class='tooltip-title'>${title}</div>`;
    });
    innerHtml += "</thead><tbody>";

    bodyLines.forEach(function(body, i) {
      const colors = tooltip.labelColors[i];
      let style = `background:${colors.backgroundColor}`;
      style += `; border-color:${colors.borderColor}`;
      style += "; border-width: 2px";
      style += "; border-radius: 30px";
      const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
      innerHtml += `<tr><td>${span}${body}</td></tr>`;
    });

    innerHtml += "</tbody>";

    const tableRoot = tooltipEl.querySelector("table");
    tableRoot.innerHTML = innerHtml;
  }

  const positionY = this._chart.canvas.offsetTop;
  const positionX = this._chart.canvas.offsetLeft;
  const toolTip = document.querySelector(".chartjs-tooltip");
  const toolTipHeight = toolTip.clientHeight;

  // Display, position, and set styles for font

  tooltipEl.style.opacity = "1";
  tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
  tooltipEl.style.top = `${positionY +
    tooltip.caretY -
    (tooltip.caretY > 10
      ? toolTipHeight > 100
        ? toolTipHeight + 5
        : toolTipHeight + 15
      : 70)}px`;
  tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
  tooltipEl.style.fontSize = `${tooltip.bodyFontSize}px`;
  tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
  tooltipEl.style.padding = `${tooltip.yPadding}px ${tooltip.xPadding}px`;
};

export const numOfBusinessessSupported = [
  "1-100",
  "101-200",
  "201-300",
  "301-400",
  "401-500",
  "501-1000",
  "Above 1000",
];

export const businessLevels = [
  {
    name: "Micro",
    description:
      "businesses with 0 - 9 employees and  total assets (excluding land and building) of less than 10 million naira",
  },
  {
    name: "Small",
    description: `businesses with 10 - 49 employees and total assets (excluding
land and building) of 10million to 99million naira`,
  },
  {
    name: "Medium",
    description: `businesses with 50 - 199 employees and total assets (excluding
land and building) of 100million to 1billion naira`,
  },
  {
    name: "Startup",
    description:
      "a fast/high growth young business typically between 0-5 years",
  },
];

export const business_subclass = [
  "Tax",
  "Book-Keeping",
  "Human Resources",
  "Legal",
  "Mentoring",
];

export const breadcrumbNameMap = (name = "", profileId = "") => ({
  "/d": "Dashboard",
  "/d/organizations": "Organizations",
  "/d/states": "States",
  "/d/listings": "Listings",
  "/d/account": "Account",
  "/d/contact": "Contact",
  "/d/about": "About Us",
  "/d/help": "Help",
  "/d/sectors": "Sectors",
  "/d/administrators": "Administrators",
  "/business": "List Organization",
  "/business/listorg": "List Organization",
  "/business/uploads": "List Organization",
  "/business/preview": "Preview Form",
  "/d/segments": "Ecosystem Segments",
  "/d/profile": "Company",
  [`/d/profile/${profileId}`]: "Profile",
  [`/d/segments/${name}`]: capitalize(
    `${name
      .split("_")
      .join(" ")
      .toString()}`
  ),
});
