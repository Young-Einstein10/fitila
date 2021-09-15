import styled from "styled-components";

const H1 = styled.h1`
  font-size: ${props => props.fontSize || "48px"};
  font-weight: ${props => props.fontWeight || "600"};
  line-height: ${props => props.lineHeight || "38px"};
  text-transform: capitalize;

  ${props =>
    props.margin &&
    `
    margin: ${props.margin}
  `}
`;

const H2 = styled.h1`
  font-size: ${props => props.fontSize || "24px"};
  font-weight: ${props => props.fontWeight || "600"};
  line-height: ${props => props.lineHeight || "30px"};
  text-transform: capitalize;

  ${props =>
    props.margin &&
    `
    margin: ${props.margin}
  `}
`;

const H3 = styled.h1`
  font-size: ${props => props.fontSize || "22px"};
  font-weight: ${props => props.fontWeight || "600"};
  line-height: ${props => props.lineHeight || "27px"};
  text-transform: capitalize;

  ${props =>
    props.margin &&
    `
    margin: ${props.margin}
  `}
`;

const H4 = styled.h1`
  font-size: ${props => props.fontSize || "20px"};
  font-weight: ${props => props.fontWeight || "600"};
  line-height: ${props => props.lineHeight || "24px"};
  text-transform: capitalize;

  ${props =>
    props.margin &&
    `
    margin: ${props.margin}
  `}
`;

const H5 = styled.h1`
  font-size: ${props => props.fontSize || "18px"};
  font-weight: ${props => props.fontWeight || "600"};
  line-height: ${props => props.lineHeight || "22px"};
  text-transform: capitalize;

  ${props =>
    props.margin &&
    `
    margin: ${props.margin}
  `}
`;

const H6 = styled.h1`
  font-size: ${props => props.fontSize || "16px"};
  font-weight: ${props => props.fontWeight || "600"};
  line-height: ${props => props.lineHeight || "20px"};
  text-transform: capitalize;

  ${props =>
    props.margin &&
    `
    margin: ${props.margin}
  `}
`;

export { H1, H2, H3, H4, H5, H6 };
