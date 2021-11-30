import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Cards } from "../../../../../../../../components/cards/frame/cards-frame";
import {
  useEcosystemContext,
  useSectorContext,
} from "../../../../../../../../context";
import { abbreviateNumberShort } from "../../../../../../../../utils/numberAbbreviator";
import useChartData from "../../hooks";
import "./index.less";

const MSMEsChart = props => {
  const { labels, datasets, options, width, height } = props;

  const { isLoading: isSectorLoading } = useSectorContext();
  const { isLoading, data: ecosystem } = useEcosystemContext();

  const msmesAndStartupsOrg = ecosystem.find(
    ecosystem => ecosystem.name === "MSMEs and Startups"
  );

  const msmesOrg = msmesAndStartupsOrg
    ? msmesAndStartupsOrg.sub_ecosystem.find(
        subEco => subEco.name.toLowerCase() === "msmes"
      )
    : null;

  const startupOrg = msmesAndStartupsOrg
    ? msmesAndStartupsOrg.sub_ecosystem.find(
        subEco => subEco.name.toLowerCase() === "startups"
      )
    : null;

  const msmesFunding = msmesOrg?.organizations.reduce(
    (total, org) => (org.funding ? Number(org.funding) : 0) + total,
    0
  );

  const startupFunding = startupOrg?.organizations.reduce(
    (total, org) => (org.funding ? Number(org.funding) : 0) + total,
    0
  );

  const funding = [
    { name: "MSMEs", funding: msmesFunding || 0 },
    { name: "Startups", funding: startupFunding || 0 },
  ];

  const chartLabels = funding.map(sector => sector.name);

  let chartDatasets = [
    {
      data: [],
      backgroundColor: ["#2C99FF", "#68B77A"],
    },
  ];

  funding.forEach(sector => {
    chartDatasets[0].data.push(sector.funding);
  });

  const { ref } = useChartData();

  const dataInfo = {
    labels: chartLabels || labels,
    datasets: chartDatasets || datasets,
  };

  return (
    <Cards
      loading={isSectorLoading || isLoading}
      title="Funding raised by MSMEs and Startups"
      size="large"
    >
      <div className="sector-funding-chart">
        <p>
          <span>
            {`₦${abbreviateNumberShort(
              funding.reduce((total, item) => total + item.funding, 0)
            )}`}
          </span>{" "}
          Total Funding
        </p>
        <Doughnut
          ref={ref}
          data={dataInfo}
          height={height}
          options={options}
          width={width}
        />
      </div>
    </Cards>
  );
};

MSMEsChart.defaultProps = {
  height: 200,
  width: 200,
  labels: ["MSMEs", "Startups"],
  datasets: [
    {
      data: [100, 300],
      backgroundColor: ["#007bff", "#00cccc"],
    },
  ],

  options: {
    cutoutPercentage: 70,
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: false,
      position: "bottom",
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    tooltips: {
      mode: "label",
      intersect: false,
      backgroundColor: "#000",
      position: "average",
      titleFontSize: 13,
      titleSpacing: 15,
      bodyFontSize: 12,
      borderColor: "#050505",
      borderWidth: 2,
      bodySpacing: 15,
      xPadding: 15,
      yPadding: 15,
      z: 999999,
      custom(tooltip) {
        if (!tooltip) return;
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
      callbacks: {
        label: function(tooltipItem, data) {
          const value = data["datasets"][0]["data"][tooltipItem["index"]];

          return `₦${abbreviateNumberShort(value)}`;
        },
      },
    },
  },
};

export default MSMEsChart;
