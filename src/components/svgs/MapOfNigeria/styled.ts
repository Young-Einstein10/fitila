import styled from "styled-components";

export const SVGWrapper = styled.div`
  path {
    fill: #e0e3e5; //#c2c7cc */
    outline: none;
    stroke: #5f6772;
    stroke-width: 0.5;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    :hover {
      fill: #65b6a6;
      stroke: #458c7e;
    }

    &.lowest {
      fill: #e0e3e5;
      stroke: #5f6772;

      :hover {
        fill: #cb7676;
        stroke: #df2020;
      }
    }

    &.low {
      fill: #c2c7cc;
      stroke: #5f6772;

      :hover {
        fill: #edcaa6;
        stroke: #d07e2a;
      }
    }

    &.average {
      fill: #b1b7be;
      stroke: #5f6772;

      :hover {
        fill: #eee7b0;
        stroke: #938620;
      }
    }

    &.high {
      fill: #9ba2ab;
      stroke: #5f6772;

      :hover {
        fill: #c8e9e3;
        stroke: #369494;
      }
    }

    &.highest {
      fill: #828b96;
      stroke: #5f6772;

      :hover {
        fill: #65b6a6;
        stroke: #458c7e;
      }
    }
  }

  @keyframes dash {
    from {
      stroke-dashoffset: 882;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
`;
