import React from "react";
import { Bar } from "react-chartjs-2";
import { Cards } from "../../../../../../../../components/cards/frame/cards-frame";
import { useOrganizationContext } from "../../../../../../../../context";
import { customTooltips } from "../../../../../../../../utils/helpers";
import { ChartContainer } from "./styled";
import { IOrganizationProps } from "../../../../../../../../context/Organization/types";

type GenderType = "male" | "female";

function filterOrgByGender(
  org: any[],
  gender: GenderType
): IOrganizationProps[] {
  if (org.length === 0 || !gender) return;

  return org.filter(
    organization => organization.ceo_gender.toLowerCase() === gender
  );
}

const FemaleBarChart = props => {
  const { labels, options, width, height, layout } = props;

  const { isLoading, data: organizationData } = useOrganizationContext();

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

  const startups = {
    maleFounders: filterOrgByGender(startupOrg, "male"),
    femaleFounders: filterOrgByGender(startupOrg, "female"),
  };
  const msmes = {
    maleFounders: filterOrgByGender(msmesorg, "male"),
    femaleFounders: filterOrgByGender(msmesorg, "female"),
  };

  const datasets = [
    {
      data: [startups.femaleFounders.length, msmes.femaleFounders.length],
      backgroundColor: "rgba(245, 71, 109, 0.645)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgb(255, 0, 55)",
      label: "Female",
      barPercentage: 0.5,
    },
    {
      data: [startups.maleFounders.length, msmes.maleFounders.length],
      backgroundColor: "rgba(39, 149, 221, 0.686)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgb(10, 134, 216)",
      label: "Male",
      barPercentage: 0.5,
    },
  ];

  const data = {
    labels,
    datasets,
  };

  return (
    <Cards loading={isLoading} title="Female and Male Led Businesses">
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

FemaleBarChart.defaultProps = {
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
      align: "end",
      labels: {
        boxWidth: 6,
        display: true,
        usePointStyle: true,
      },
    },
    scales: {
      yAxes: [
        {
          // stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
          // gridLines: {
          //   color: "#e5e9f2",
          // },
          // ticks: {
          //   beginAtZero: true,
          //   fontSize: 13,
          //   fontColor: "#182b49",
          //   max: 400,
          //   stepSize: 50,
          //   callback(value, index, values) {
          //     return `${value}`;
          //   },
          // },
        },
      ],
      xAxes: [
        {
          // stacked: true,
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

export default FemaleBarChart;
