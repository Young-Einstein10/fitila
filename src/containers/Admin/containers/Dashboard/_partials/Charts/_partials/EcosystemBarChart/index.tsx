import React from "react";
import { Bar } from "react-chartjs-2";
import { Cards } from "../../../../../../../../components/cards/frame/cards-frame";
import { useOrganizationContext } from "../../../../../../../../context";
import { customTooltips } from "../../../../../../../../utils/helpers";
// import { data as dataset } from "../../../../../../../../data.json";
import { ChartContainer } from "../FemaleBarChart/styled";

const EcosystemBarChart = props => {
  const { labels, options, width, height, layout } = props;

  const { data: organizationData, isLoading } = useOrganizationContext();

  // Filter Entrepreneur Organizations
  const entrepreneurOrg = organizationData
    .filter(org => org.is_entrepreneur || !org.is_ecosystem)
    .filter(org => org.business_level);

  // Filter Startup and MSMEs Organizations
  const startupOrg = entrepreneurOrg.filter(
    org => org.business_level.toLowerCase() === "startup"
  );
  const msmesorg = entrepreneurOrg.filter(
    org => org.business_level.toLowerCase() !== "startup"
  );

  const totalNumOfJobsByStartup = startupOrg.reduce(
    (acc, org) => acc + Number(org.no_of_jobs),
    0
  );
  const totalNumOfJobsByMSMEs = msmesorg.reduce(
    (acc, org) => acc + Number(org.no_of_jobs),
    0
  );

  const datasets = [
    {
      data: [totalNumOfJobsByStartup, totalNumOfJobsByMSMEs],
      backgroundColor: [
        "rgba(245, 71, 109, 0.645)",
        "rgba(39, 149, 221, 0.686)",
      ],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
      hoverBackgroundColor: ["rgb(255, 0, 55)", "rgb(10, 134, 216)"],
      label: "",
      barPercentage: 1,
    },
  ];

  const data = {
    labels,
    datasets,
  };

  return (
    <Cards
      loading={isLoading}
      title="Jobs created by Ecosystem and Enterpreneurs"
    >
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

EcosystemBarChart.defaultProps = {
  height: 200,
  width: 200,
  labels: ["Startups", "MSMEs"],

  options: {
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
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },
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

export default EcosystemBarChart;
