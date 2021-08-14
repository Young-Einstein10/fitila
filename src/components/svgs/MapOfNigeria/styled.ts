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
    fill: #034839;
    outline: none;
    stroke: rgb(1, 29, 24);
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: dash 5s linear alternate infinite;

    :hover {
      fill: #012d27;
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

  .NG-RI {
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
  }

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
