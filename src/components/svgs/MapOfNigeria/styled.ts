import styled from "styled-components";
import { stateJson } from "./colors";

const PathStyled = styled.path`
  fill: #e0e3e5; //#c2c7cc */
  outline: none;
  stroke: #5f6772;
  stroke-width: 0.5;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  :hover {
    fill: ${props => {
      const state = props["data-tip"];

      const currState = stateJson.find(d => d.state === state.toLowerCase());

      return currState.color;
    }};
    /* stroke: #458c7e; */
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

export default PathStyled;
