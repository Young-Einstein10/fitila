import React from 'react'
import { MessageStyled } from '../styled'


const ErrorMsg = ({ content }) => {
  return (
    <MessageStyled bgColor={"#FA4339"} borderColor={"#FA4339"}>
      {content}
    </MessageStyled>
  )
}

export default ErrorMsg
