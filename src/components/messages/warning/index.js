import React from 'react'
import { MessageStyled } from '../styled'


const WarningMsg = ({ content }) => {
  return (
    <MessageStyled bgColor={"#E7833B"} borderColor={"#E7833B"}>
      {content}
    </MessageStyled>
  )
}

export default WarningMsg
