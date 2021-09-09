import React, { FC } from "react";
import { Line } from "react-chartjs-2";
import { Cards } from "../../../../../../../../components/cards/frame/cards-frame";
import {
  useOrganizationContext,
  useSectorContext,
} from "../../../../../../../../context";
import { capitalize } from "../../../../../../../../utils/helpers";
import { abbreviateNumberShort } from "../../../../../../../../utils/numberAbbreviator";
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

let chartDatasets = [];

const LineChart: FC<ILineChartProps> = props => {
  const { datasets, options, height, layout, width } = props;

  const { isLoading, data: sectors } = useSectorContext();
  const {
    data: organizations,
    isLoading: isOrgLoading,
  } = useOrganizationContext();

  let isChartLoading = true;

  // Find Total Funding for each sector
  const sectorFundings = sectors
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(sector => {
      const organizationList = organizations.filter(
        org => org.sector_name.toLowerCase() === sector.name.toLowerCase()
      );

      const totalFunding = organizationList.reduce(
        (total, org) => Number(org.funding ? org.funding : 10000) + total,
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

  chartDatasets = [
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

  const scales = {
    yAxes: [
      {
        gridLines: {
          color: "#e5e9f2",
          borderDash: [3, 3],
          zeroLineColor: "#e5e9f2",
          zeroLineWidth: 1,
          zeroLineBorderDash: [3, 3],
        },
        ticks: {
          beginAtZero: true,
          max: Math.max(...chartDatasets[0].data),
          stepSize: Math.max(...chartDatasets[0].data) / 5,
          callback(value, index, values) {
            const maxValue = Math.max(...values);

            if (maxValue === value) {
              return `₦${abbreviateNumberShort(value)}+`;
            }

            return `₦${abbreviateNumberShort(value)}`;
          },
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  };

  console.log(data);

  return (
    <Cards
      loading={isLoading || isOrgLoading || isChartLoading}
      title={capitalize("Funding raised by Entrepreneurs in various sectors")}
      size="large"
    >
      <ChartContainer className="parentContainer">
        <Line
          width={width}
          data={data}
          height={height}
          options={{
            ...options,
            ...layout,
            scales,
          }}
        />
      </ChartContainer>
      {/* 
      <div>
        <p>This is the Legend Container</p>
      </div> */}
    </Cards>
  );
};

LineChart.defaultProps = {
  height: 479,
  width: null,
  datasets: [
    {
      borderColor: "rgba(54, 162, 235, 1)", // 001737
      borderWidth: 1,
    },
  ],

  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    legend: {
      display: false,
      labels: {
        display: false,
      },
    },
    tooltips: {
      mode: "label",
      intersect: false,
      backgroundColor: "#000",
      position: "average",
      // titleFontColor: "#5A5F7D",
      titleFontSize: 13,
      titleSpacing: 15,
      // bodyFontColor: "#868EAE",
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
        title(ctx) {
          const { label } = ctx[0];
          return label;
        },
        label(t, d) {
          const { value } = t;
          return `₦${abbreviateNumberShort(Number(value))}`;
        },
        labelColor(tooltipItem, chart) {
          return {
            backgroundColor: "#000",
            borderColor: "transparent",
          };
        },
      },
    },
  },
};

export default LineChart;
