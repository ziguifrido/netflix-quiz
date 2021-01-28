import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FiChevronLeft } from 'react-icons/fi'
import { CommonLoading } from 'react-loadingg'

import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizContainer from '../src/components/QuizContainer'
import Button from '../src/components/Button'

const LoadingWidget = () => {
  return (
    <>
      <Widget>
        <Widget.Header>
          <h1>Carregando...</h1>
        </Widget.Header>

        <Widget.Content>
          <CommonLoading
            color={db.theme.colors.contrastText}
            size="large"
            style={{
              position: 'relative',
              width: '100%'
            }}
          />
        </Widget.Content>
      </Widget>
    </>
  )
}

const QuestionWidget = ({ router, i, n, question, onSubmit }) => {
  return (
    <Widget>
      <Widget.Header>
        <p onClick={() => router.push('/')}>
          <FiChevronLeft size={20}/>&nbsp;&nbsp;&nbsp;
        </p>
        <h1>{`Pergunta ${i + 1} de ${n}`}</h1>
      </Widget.Header>
      <img
        alt={question.description}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        src={question.image}
      />
      <form onSubmit={onSubmit}>
        <Widget.Content>
          <h1>{question.title}</h1>
        </Widget.Content>
        <Widget.Content>
          {question.alternatives.map((alternative, index) => {
            return (
              <Widget.Topic key={index} onClick={() => alert(index)}>
                {`${index + 1} - ${alternative}`}
              </Widget.Topic>
            )
          })}
        </Widget.Content>
        <Widget.Content>
          <Button type="submit">Próximo</Button>
        </Widget.Content>
      </form>
    </Widget>
  )
}

const ResultWidget = () => {
  return (
    <>
      <Widget>
        <Widget.Header>
          <h1>Resultado</h1>
        </Widget.Header>

        <Widget.Content>
          <p></p>
        </Widget.Content>
      </Widget>
    </>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

export default function QuizPage () {
  const router = useRouter()
  const [i, setI] = useState(0)
  const n = db.questions.length
  const question = db.questions[i]
  const [screenState, setScreenState] = useState(screenStates.LOADING)

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 3000)
  }, [])

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          {screenState === screenStates.LOADING && <LoadingWidget />}
          {screenState === screenStates.QUIZ &&
            <QuestionWidget router={router} i={i} n={n} question={question} onSubmit={(e) => {
              e.preventDefault()
              if (i + 1 === n) {
                setScreenState(screenStates.RESULT)
              } else {
                setI(i + 1)
              }
            }}/>
          }
          {screenState === screenStates.RESULT && <ResultWidget />}
          <Footer/>
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/ziguifrido/netflix-quiz"/>
      </QuizBackground>
    </>
  )
}
