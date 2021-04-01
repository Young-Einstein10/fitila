import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  useOrganizationContext,
  useSectorContext,
} from "../../../../../../../../context";
import useChartData from "../../hooks";
import "./index.less";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const DoughnutChart = props => {
  const { labels, datasets, options, height } = props;

  const { data: organizations } = useOrganizationContext();
  const { data: sectors } = useSectorContext();

  // Find Total Funding for each sector
  const sectorFundings = sectors.map(sector => {
    const organizationList = organizations.filter(
      org => org.sector_name === sector.name
    );

    const totalFunding = organizationList.reduce(
      (total, org) => Number(org.funding ? org.funding : 5) + total,
      0
    );

    return { name: sector.name, funding: totalFunding };
  });

  const chartLabels = sectorFundings.map(sector => sector.name);

  let chartDatasets = [
    {
      data: [],
      backgroundColor: [],
    },
  ];

  sectorFundings.forEach(sector => {
    chartDatasets[0].data.push(sector.funding);
    chartDatasets[0].backgroundColor.push(getRandomColor());
  });

  const { ref } = useChartData();

  const dataInfo = {
    labels: chartLabels || labels,
    datasets: chartDatasets || datasets,
  };

  return (
    <div className="sector-funding-chart">
      <p>
        <span>{sectors.length}</span> Total Sectors
      </p>
      <Doughnut
        ref={ref}
        data={dataInfo}
        height={height}
        options={options}
        width={200}
      />
    </div>
  );
};

DoughnutChart.defaultProps = {
  height: 200,
  // width: 220,
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      data: [20, 20, 30, 5, 25],
      backgroundColor: ["#560bd0", "#007bff", "#00cccc", "#cbe0e3", "#74de00"],
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
  },
};

export default DoughnutChart;
