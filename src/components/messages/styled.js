import Styled from "styled-components"

const MessageStyled = Styled.div`
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: ${({ bgColor }) => bgColor};
  border: 2px solid ${({ borderColor }) => borderColor};
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1.5rem;
`

export { MessageStyled }