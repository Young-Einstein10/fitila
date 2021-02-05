import React from 'react'
import { MessageStyled } from '../styled'


const SuccessMsg = ({ content }) => {
  return (
    <MessageStyled bgColor={"#68B77A"} borderColor={"#68B77A"}>
      {content}
    </MessageStyled>
  )
}

export default SuccessMsg
