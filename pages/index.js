import React, { useState } from 'react'
import { useRouter } from 'next/router'

import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer'

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>

          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
            </Widget.Content>
            <Widget.Content>
              <form onSubmit={(e) => {
                e.preventDefault()
                router.push(`/quiz?name=${name}`)
              }}>
                <Input
                  name="nome-usuario"
                  placeholder="Digite o seu nome para jogar!"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button type='submit' disabled={name.length === 0}>
                  Jogar
                </Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Header>
              <h1>Titulo</h1>
            </Widget.Header>
            <Widget.Content>
              <p>Conteúdo</p>
            </Widget.Content>
          </Widget>
          <Footer/>
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/ziguifrido/netflix-quiz"/>
      </QuizBackground>
    </>
  )
}
