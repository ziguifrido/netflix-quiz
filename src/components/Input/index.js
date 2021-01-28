import React from 'react'
import styled from 'styled-components'

import db from '../../../db.json'

const InputBase = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  height: 38px;
  border-radius: ${db.theme.borderRadius};
  border: 1px solid ${db.theme.colors.secondary};
  outline: 0;
  margin-bottom: 25px;
  text-indent: 10px;
`

export default function Input(props) {
  return (
    <div>
      <InputBase
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
      />
    </div>
  )
}
