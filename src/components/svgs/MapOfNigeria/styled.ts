import styled from "styled-components";

export const SVGWrapper = styled.div`
  svg {
    /* width: 100%; */
    /* height: 600px; 
    position: absolute;
    left: 0.25%;
    right: 11.34%;
    top: 18.75%;
    bottom: 18.75%; */
    /* box-shadow: 0px 4px 31px #01352E; */
  }

  path {
    fill: #e0e3e5; //#c2c7cc
    outline: none;
    stroke: #5f6772;
    stroke-width: 0.5;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    /* stroke-dasharray: 1000;
    stroke-dashoffset: 1000; */
    /* animation: dash 5s linear alternate infinite; */

    /* :hover {
      fill: #012d27;
    } */

    &.lowest {
      :hover {
        fill: #cb7676;
        stroke: #df2020;
      }
    }

    &.low {
      :hover {
        fill: #edcaa6;
        stroke: #d07e2a;
      }
    }

    &.average {
      :hover {
        fill: #eee7b0;
        stroke: #938620;
      }
    }

    &.high {
      :hover {
        fill: #c8e9e3;
        stroke: #369494;
      }
    }

    &.highest {
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

  /* .NG-RI {
    fill: #ffcc5c;
  }

  .NG-RI:hover,
  .NG-BY:hover,
  .NG-DE:hover,
  .NG-ED:hover {
    fill: #01352e;
  }

  .NG-BY {
    fill: #f88600;
  }

  .NG-DE {
    fill: #f35844;
  }

  .NG-ED {
    fill: #ffeead;
  } */

  #tooltip {
    position: absolute;
    border: solid 1px;
    background-color: skyblue;
    border-radius: 5px;
    padding: 5px;
    z-index: 1070;
    display: block;
    margin: 0;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-break: break-all;
    word-spacing: normal;
    white-space: normal;
    line-break: auto;
    font-size: 0.875rem;
    word-wrap: break-word;
    opacity: 0;
    pointer-events: none;

    .nameOfState {
      font-size: 1.2rem;
      color: #000;
    }
  }
`;
