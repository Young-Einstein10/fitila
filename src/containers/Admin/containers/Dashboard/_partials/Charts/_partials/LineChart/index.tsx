import React, { FC } from "react";
import { Line } from "react-chartjs-2";
import { Cards } from "../../../../../../../../components/cards/frame/cards-frame";
import {
  useOrganizationContext,
  useSectorContext,
} from "../../../../../../../../context";
import {
  capitalize,
  getRandomColor,
} from "../../../../../../../../utils/helpers";
import { abbreviateNumberShort } from "../../../../../../../../utils/numberAbbreviator";
import { ChartContainer } from "../FemaleBarChart/styled";
import { ChartLegend } from "./styled";

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

  let sectorColors = {
    Agribusiness: "#AAAD37",
    Creatives: "#72F4AF",
    "Development Sector": "#F51AD2",
    Education: "#E4813C",
    Health: "#F488AA",
    Manufacturing: "#A171FD",
    Others: "#DA1A40",
    "Private Sector": "#BE8BE6",
    "Public Sector": "#9303E6",
    Technology: "#1f1f86",
  };

  chartLabels.forEach(sector => (sectorColors[sector] = getRandomColor()));

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
    labels: chartLabels.map(l => l.substring(0, 2)) || [],
    datasets: chartDatasets || datasets,
  };

  options.tooltips.callbacks = {
    ...options.tooltips.callbacks,
    title(ctx) {
      const { index } = ctx[0];

      const originalLabel = chartLabels[index];

      return originalLabel;
    },
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
        ticks: {
          fontSize: 12,
          callback(value, index, values) {
            return `${value}`;
          },
        },
      },
    ],
  };

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

      <ChartLegend className="chart-legend">
        {chartLabels.length
          ? chartLabels
              .map(l => l.substring(0, 2))
              .map((label, i) => (
                <p key={i}>
                  <strong>{label} = </strong> {chartLabels[i]}
                </p>
              ))
          : null}
      </ChartLegend>
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
