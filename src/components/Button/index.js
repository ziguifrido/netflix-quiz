import styled from 'styled-components'

import db from '../../../db.json'

const Button = styled.button`
  width: 100%;
  height: 36px; 
  border-radius: ${db.borderRadius};
  border: none;
  color: ${db.theme.colors.contrastText};
  background-color: ${db.theme.colors.primary};
  font-family: Lato;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  
`

export default Button
