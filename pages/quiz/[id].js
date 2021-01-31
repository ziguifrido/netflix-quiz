import React from 'react'
import { ThemeProvider } from 'styled-components'

import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({ externalDB }) {
  return (
    <div>
      <ThemeProvider theme={externalDB.theme}>
        <QuizScreen db={externalDB}/>
      </ThemeProvider>
    </div>
  )
}

export async function getServerSideProps(context) {
  const [githubUser, projectName] = context.query.id.split('___')

  const externalDB = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Falha ao pegar os dados')
    })
    .then((obj) => obj)
    .catch((err) => {
      throw new Error(err)
    })

  return {
    props: {
      externalDB
    }
  }
}
