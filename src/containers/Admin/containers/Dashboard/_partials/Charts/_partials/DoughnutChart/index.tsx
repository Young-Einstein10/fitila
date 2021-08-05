import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Cards } from "../../../../../../../../components/cards/frame/cards-frame";
import { useSectorContext } from "../../../../../../../../context";
import useChartData from "../../hooks";
import "./index.less";

const DoughnutChart = props => {
  const { labels, datasets, options, width, height } = props;

  const { isLoading: isSectorLoading } = useSectorContext();

  const funding = [
    { name: "MSMEs", funding: 300 },
    { name: "Startups", funding: 200 },
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
      loading={isSectorLoading}
      title="Funding by MSMEs and Startups"
      size="large"
    >
      <div className="sector-funding-chart">
        <p>
          <span>
            {funding.reduce((total, item) => total + item.funding, 0)}
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

DoughnutChart.defaultProps = {
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
  },
};

export default DoughnutChart;
