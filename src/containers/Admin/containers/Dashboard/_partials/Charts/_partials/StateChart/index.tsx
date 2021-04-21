import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useOrganizationContext } from "../../../../../../../../context";
import useChartData from "../../hooks";
import "../DoughnutChart/index.less";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const StateChart = props => {
  const { labels, datasets, options, height } = props;

  const { states, data: organizations } = useOrganizationContext();

  const stateData = states.map(state => {
    const organizationsInState = organizations.filter(
      org => org.state.toLowerCase() === state.toLowerCase()
    );

    return {
      name: state,
      numOfOrganizations: organizationsInState.length
        ? organizationsInState.length
        : 0,
    };
  });

  const chartLabels = stateData.map(state => state.name);

  let chartDatasets = [
    {
      data: [],
      backgroundColor: [],
    },
  ];

  stateData.forEach(state => {
    chartDatasets[0].data.push(state.numOfOrganizations);
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
        <span>{states.length}</span> Total States
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

StateChart.defaultProps = {
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

export default StateChart;
