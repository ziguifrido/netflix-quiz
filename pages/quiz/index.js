import React from 'react'

import db from '../../db.json'
import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'

export default function QuizPage () {
  return (
    <ThemeProvider theme={db.theme}>
      <QuizScreen db={db}/>
    </ThemeProvider>
  )
}
