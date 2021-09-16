import styled from "styled-components";

export const ChartLegend = styled.div`
  margin-top: 1.2rem;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  p {
    margin-bottom: 0;
    align-self: center;

    @media screen and (max-width: 576px) {
      justify-self: center;
    }
  }
`;
