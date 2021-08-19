import React, { FC } from "react";
import { Line } from "react-chartjs-2";
import { Cards } from "../../../../../../../../components/cards/frame/cards-frame";
import {
  useOrganizationContext,
  useSectorContext,
} from "../../../../../../../../context";
import { ChartContainer } from "../FemaleBarChart/styled";

interface ILineChartProps {
  height?: number;
  labels?: string[];
  datasets?: any[];
  layout?: any;
  width?: number;
  options?: any;
  id?: string;
}

const LineChart: FC<ILineChartProps> = props => {
  const { datasets, options, height, layout, width } = props;

  const { isLoading, data: sectors } = useSectorContext();
  const {
    data: organizations,
    isLoading: isOrgLoading,
  } = useOrganizationContext();

  let isChartLoading = true;

  // Find Total Funding for each sector
  const sectorFundings = sectors.map(sector => {
    const organizationList = organizations.filter(
      org => org.sector_name.toLowerCase() === sector.name.toLowerCase()
    );

    const totalFunding = organizationList.reduce(
      (total, org) => Number(org.funding ? org.funding : 0) + total,
      0
    );

    return { name: sector.name, funding: totalFunding };
  });

  // console.log({
  //   sectorFundings,
  //   orgWithoutFunding: organizations.filter(org => !org.funding),
  // });

  // Sector named "Others" should appear last in Chart
  const lastIndex = sectorFundings.findIndex(
    sector => sector.name.toLowerCase() === "others"
  );

  const result = sectorFundings.filter((sector, index) => index !== lastIndex);

  const chartLabels = [
    ...result.sort(),
    sectorFundings[lastIndex],
  ].map(sector => (sector ? sector.name : ""));

  const bgColor = new Array(sectorFundings.length).fill("#ddf4ff");

  let chartDatasets = [
    {
      data: [],
      backgroundColor: bgColor,
      borderColor: "rgba(54, 162, 235, 1)", // 001737
      borderWidth: 1,
    },
  ];

  sectorFundings.forEach(sector => {
    chartDatasets[0].data.push(sector.funding);
  });

  isChartLoading = false;

  const data = {
    labels: chartLabels || [],
    datasets: chartDatasets || datasets,
  };

  return (
    <Cards
      loading={isLoading || isOrgLoading || isChartLoading}
      title="Funding by Sector"
      size="large"
    >
      <ChartContainer className="parentContainer">
        <Line
          // id={id}
          width={width}
          data={data}
          height={height}
          options={{
            ...options,
            ...layout,
          }}
        />
      </ChartContainer>
    </Cards>
  );
};

LineChart.defaultProps = {
  height: 479,
  width: null,
  datasets: [
    {
      // backgroundColor: bgColor,
      borderColor: "rgba(54, 162, 235, 1)", // 001737
      borderWidth: 1,
    },
  ],

  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: "10",
        right: 0,
        top: 0,
        bottom: "10",
      },
    },
    legend: {
      display: false,
      labels: {
        display: false,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            callback(value, index, values) {
              return `${value}k`;
            },
          },
        },
      ],
    },
  },
};

export default LineChart;
