import React from "react";
import { Bar } from "react-chartjs-2";
import { Cards } from "../../../../../../../../components/cards/frame/cards-frame";
import { useOrganizationContext } from "../../../../../../../../context";
import { customTooltips } from "../../../../../../../../utils/helpers";
import { ChartContainer } from "./styled";

const BarChart = props => {
  const { labels, options, width, height, layout } = props;

  const { data: organizationData, isLoading } = useOrganizationContext();

  const maleFounders = organizationData.filter(
    organization => organization.ceo_gender.toLowerCase() === "male"
  );
  const femaleFounders = organizationData.filter(
    organization => organization.ceo_gender.toLowerCase() === "female"
  );

  const datasets = [
    {
      data: [femaleFounders.length, maleFounders.length],
      backgroundColor: [
        "rgba(245, 71, 109, 0.645)",
        "rgba(39, 149, 221, 0.686)",
        // "rgba(255, 99, 132, 0.2)",
        // "rgba(54, 162, 235, 0.2)",
      ],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
      hoverBackgroundColor: ["rgb(255, 0, 55)", "rgb(10, 134, 216)"],
      label: "Founders",
      barPercentage: 0.6,
    },
  ];

  const data = {
    labels,
    datasets,
  };

  return (
    <Cards loading={isLoading} title="Female and Male Led Startups">
      <ChartContainer className="parentContainer">
        <Bar
          data={data}
          width={width}
          height={height}
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
    </Cards>
  );
};

BarChart.defaultProps = {
  height: 200,
  width: 200,
  labels: ["Female", "Male"],

  options: {
    // legend: {
    //   display: false,
    //   labels: {
    //     display: false,
    //   },
    // },
    maintainAspectRatio: true,
    responsive: true,
    layout: {
      padding: {
        left: "0",
        right: 0,
        top: 0,
        bottom: "0",
      },
    },
    legend: {
      display: false,
      position: "top",
      align: "center",
      labels: {
        boxWidth: 6,
        display: false,
        usePointStyle: true,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          // gridLines: {
          //   display: false,
          // },
          // ticks: {
          //   display: false,
          // },
          gridLines: {
            color: "#e5e9f2",
          },
          ticks: {
            beginAtZero: true,
            fontSize: 13,
            fontColor: "#182b49",
            max: 400,
            stepSize: 50,
            callback(value, index, values) {
              return `${value}`;
            },
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },
          // ticks: {
          //   display: false,
          // },
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
