import { Card, Row, Button } from "antd";
import Styled from "styled-components";

const CardSegmentStyled = Styled(Card)`
  height: 100%;

  .ant-card-body {
    background: #F8F8F8;
    display: flex;
    align-items: center;
    height: 100%;

    div {
      margin-left: 20px;
    }

    span {
      color: #5C6066;
    }
  }
`;

const ViewProfileBtnStyled = Styled(Button)`
  color: #FF6D00
  border: 1px solid #FF6D00
`;

const TableHeaderButtonStyled = Styled(Button)`
  background: #F7F9FA;
  color: #1D429C;
  font-weight: 700;
  border: 0;

  &:hover {
    background: #F7F9FA;
    color: #1D429C;
    border-color: #F7F9FA;
  }

  svg {
    margin-left: 25px
  }
`;

const RowStyled = Styled(Row)`
  height: 400px;
  display: grid;
  grid-template-columns: repeat(17, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-gap: 0.5rem;

  /* grid-template-areas: 
    "A A A A A A  B B B C C C   E E F F G G"
    "A A A A A A  B B B C C C   E E F F G G"
    "A A A A A A  B B B C C C   H H I I J J"
    "A A A A A A  D D D D D D   H H I I J J"
    "A A A A A A  D D D D D D   K K K K K K"
    "A A A A A A  D D D D D D   K K K K K K"; */


  .cell {
    border-radius: 5px;
    padding: 1rem;
    color: black;

    p {
      margin-bottom: 0;
      font-weight: 700;
    }

    &:hover {
      cursor: pointer;
    }
  }
    .cell--1 {
      background: rgb(177, 226, 203);
      /* grid-area: A; */
      grid-column: 1 / 6;
      grid-row: 1 / -1;
    }

    .cell--2 {
      background: #B7BEE6;
      /* grid-area: B; */
      grid-column: 6 / 9;
      grid-row: 1 / 7;
    }

    .cell--3 {
      background: #FFEABD;
      /* grid-area: C; */
      grid-column: 9 / 12;
      grid-row: 1 / 7;
    } 

    .cell--4 {
      background: #B7BEE6;
      /* grid-area: D; */
      grid-column: 6 / 12;
      grid-row: 7 / -1;
    }

    .cell--5 {
      background: #EDB29F;
      /* grid-area: E; */
      grid-column: 12 / 14;
      grid-row: 1 / 5;
    }

    .cell--6 {
      background: #FFB49B;
      /* grid-area: F; */
      grid-column: 14 / 16;
      grid-row: 1 / 5;
    }

    .cell--7 {
      background: #EDB29F;
      /* grid-area: G; */
      grid-column: 16 / 18;
      grid-row: 1 / 4;
    }

    .cell--8 {
      background: #9FBEED;
      /* grid-area: H; */
      grid-column: 12 / 14;
      grid-row: 5 / 9;
    }

    .cell--9 {
      background: #A7DEC2;
      /* grid-area: I; */
      grid-column: 14 / 16;
      grid-row: 5 / 9;
    }

    .cell--10 {
      background: #E4E4E4;
      /* grid-area: J; */
      grid-column: 16 / 18;
      grid-row: 4 / 9;
    }

    .cell--11 {
      background: #9FBEED;
      /* grid-area: K; */
      grid-column: 12 / 18;
      grid-row: 9 / -1;
    }
  
`;

const CellStyledOne = Styled.div`
  height: 100%;
`;

const CellStyledTwo = Styled.div`
  height: 100%;
`;

const CellStyledThree = Styled.div`
  height: 100%;
`;

export {
  CardSegmentStyled,
  ViewProfileBtnStyled,
  TableHeaderButtonStyled,
  CellStyledOne,
  CellStyledTwo,
  CellStyledThree,
  RowStyled,
};
