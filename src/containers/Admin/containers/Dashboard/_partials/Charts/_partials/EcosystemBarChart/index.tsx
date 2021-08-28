import React from "react";
import { Bar } from "react-chartjs-2";
import { Cards } from "../../../../../../../../components/cards/frame/cards-frame";
import { useOrganizationContext } from "../../../../../../../../context";
import {
  customTooltips,
  getTotalFunding,
} from "../../../../../../../../utils/helpers";
import { abbreviateNumberShort } from "../../../../../../../../utils/numberAbbreviator";
import { ChartContainer } from "../FemaleBarChart/styled";

const EcosystemBarChart = props => {
  const { labels, options, width, height, layout } = props;

  const { data: organizationData, isLoading } = useOrganizationContext();

  const ecosystemOrg = organizationData.filter(org => org.is_ecosystem);
  const enterpreneurOrg = organizationData.filter(org => org.is_entrepreneur);

  const ecosystemFunding = ecosystemOrg.length
    ? getTotalFunding(ecosystemOrg)
    : getTotalFunding(organizationData);

  const enterpreneurFunding = enterpreneurOrg.length
    ? getTotalFunding(enterpreneurOrg)
    : getTotalFunding(organizationData);

  const datasets = [
    {
      data: [enterpreneurFunding, ecosystemFunding],
      backgroundColor: [
        "rgba(245, 71, 109, 0.645)",
        "rgba(39, 149, 221, 0.686)",
        // "rgba(255, 99, 132, 0.2)",
        // "rgba(54, 162, 235, 0.2)",
      ],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
      hoverBackgroundColor: ["rgb(255, 0, 55)", "rgb(10, 134, 216)"],
      label: "",
      barPercentage: 0.6,
    },
  ];

  const data = {
    labels,
    datasets,
  };

  return (
    <Cards loading={isLoading} title="Funding by Ecosystem and Enterpreneurs">
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
  labels: ["Enterpreneurs", "Ecosystem Players"],

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
            color: "#e5e9f2",
          },
          ticks: {
            beginAtZero: true,
            fontSize: 13,
            fontColor: "#182b49",
            max: 50000000,
            stepSize: 10000000,
            callback(value, index, values) {
              return `${abbreviateNumberShort(Number(value))}`;
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
