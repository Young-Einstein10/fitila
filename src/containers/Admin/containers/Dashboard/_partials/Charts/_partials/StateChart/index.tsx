import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Cards } from "../../../../../../../../components/cards/frame/cards-frame";
import { useOrganizationContext } from "../../../../../../../../context";
import useChartData from "../../hooks";
import "../MSMEsChart/index.less";

const bgColors = [
  "#CB2759",
  "#475605",
  "#88FD4E",
  "#43D5DC",
  "#F0B4D9",
  "#7DAA49",
  "#DE6F70",
  "#CB7A7B",
  "#973915",
  "#5A0594",
  "#A169E1",
  "#D10E9B",
  "#487FF0",
  "#860042",
  "#A30D5F",
  "#8CC80B",
  "#ffcc15",
  "#FC1A7E",
  "#CE23A6",
  "#EE9661",
];

const StateChart = props => {
  const { options, width, height } = props;

  const { states, isLoading, data: organizations } = useOrganizationContext();

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
      backgroundColor: bgColors,
    },
  ];

  stateData.forEach(state => {
    chartDatasets[0].data.push(state.numOfOrganizations);
    // chartDatasets[0].backgroundColor.push(getRandomColor());
  });

  const { ref } = useChartData();

  const dataInfo = {
    labels: chartLabels || [],
    datasets: chartDatasets || [],
  };

  return (
    <Cards loading={isLoading} title="Startups Ranking by State" size="large">
      <div className="sector-funding-chart">
        <p>
          <span>{states.length}</span> Total States
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

StateChart.defaultProps = {
  height: 200,
  width: 200,

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
