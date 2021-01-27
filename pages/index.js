import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

const Input = styled.input`
  width: 100%;
  height: 38px;
  border-radius: ${db.theme.borderRadius};
  border-color: ${db.theme.colors.secondary};
  margin-top: 1em;
  margin-bottom: 1em;
  text-indent: 10px;
`

const Button = styled.button`
  width: 100%;
  height: 36px; 
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: ${db.borderRadius};
  border: none;
  color: ${db.theme.colors.contrastText};
  background-color: ${db.theme.colors.primary};
  font-family: Lato;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  
`

export default function Home () {
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
                <Input placeholder="Digite o seu nome para jogar!" value={name} onChange={(e) => {
                  setName(e.target.value)
                }}/>
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
