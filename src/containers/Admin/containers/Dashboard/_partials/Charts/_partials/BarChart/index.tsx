import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartContainer } from "./styled";

// Custom Tooltip
const customTooltips = function(tooltip) {
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

const BarChart = props => {
  const { labels, datasets, options, height, layout } = props;

  const data = {
    labels,
    datasets,
  };

  return (
    <ChartContainer className="parentContainer">
      <Bar
        data={data}
        height={window.innerWidth <= 575 ? 200 : height}
        options={{
          ...options,
          ...layout,
          tooltips: {
            mode: "label",
            intersect: false,
            position: "average",
            enabled: false,
            custom: customTooltips,
            callbacks: {
              label(t, d) {
                const dstLabel = d.datasets[t.datasetIndex].label;
                const { yLabel } = t;
                return `<span class="chart-data">${yLabel}</span> <span class="data-label">${dstLabel}</span>`;
              },
              labelColor(tooltipItem, chart) {
                const dataset =
                  chart.config.data.datasets[tooltipItem.datasetIndex];
                return {
                  backgroundColor: dataset.hoverBackgroundColor,
                  borderColor: "transparent",
                  usePointStyle: true,
                };
              },
            },
          },
        }}
      />
    </ChartContainer>
  );
};

BarChart.defaultProps = {
  height: 200,
  labels: [
    "Jan",
    "Feb",
    // "Mar",
    // "Apr",
    // "May",
    // "Jun",
    // "Jul",
    // "Aug",
    // "Sep",
    // "Oct",
    // "Nov",
    // "Dec",
  ],
  datasets: [
    {
      data: [20, 60],
      backgroundColor: "rgba(0,23,55, .5)",
      label: "Profit",
    },
    {
      data: [10, 40],
      backgroundColor: "rgba(28,225,172, .5)",
      label: "Lose",
    },
  ],

  options: {
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: true,
      position: "bottom",
      align: "center",
      labels: {
        boxWidth: 6,
        display: true,
        usePointStyle: true,
      },
    },
    layout: {
      padding: {
        left: "0",
        right: 0,
        top: 0,
        bottom: "0",
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "#e5e9f2",
          },
          ticks: {
            beginAtZero: true,
            fontSize: 13,
            fontColor: "#182b49",
            max: 80,
            stepSize: 20,
            callback(value, index, values) {
              return `${value}k`;
            },
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          barPercentage: 0.6,
          ticks: {
            beginAtZero: true,
            fontSize: 13,
            fontColor: "#182b49",
          },
        },
      ],
    },
  },
};

export default BarChart;
