import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FiChevronLeft, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { WaveLoading } from 'react-loadingg'

// import db from '../../../db.json'
import Widget from '../../../src/components/Widget'
import QuizBackground from '../../../src/components/QuizBackground'
import Footer from '../../../src/components/Footer'
import GitHubCorner from '../../../src/components/GitHubCorner'
import QuizContainer from '../../../src/components/QuizContainer'
import Button from '../../../src/components/Button'
import AlternativesForm from '../../../src/components/AlternativesForm'
import Link from '../../components/Link'

const LoadingWidget = ({ db }) => {
  return (
    <>
      <Widget>
        <Widget.Header>
          <h1>Carregando...</h1>
        </Widget.Header>

        <Widget.Content>
          <WaveLoading
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

const QuestionWidget = ({ router, i, n, question, onSubmit, addResult, db }) => {
  const [isSubmited, setIsSubmited] = useState(false)
  const [selected, setSelected] = useState(undefined)
  const [isCorrect, setIsCorrect] = useState(undefined)
  const isSelected = selected !== undefined

  useEffect(() => {
    setIsCorrect(selected === question.answer)
  }, [selected])

  return (
    <Widget>
      <Widget.Header>
        <Link href="/" style={{ color: db.theme.colors.contrastText }}>
          <FiChevronLeft size={20}/>
        </Link>
        &nbsp;&nbsp;&nbsp;
        <h1>{`Pergunta ${i + 1} de ${n}`}</h1>
      </Widget.Header>
      <img
        alt={question.description}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        src={question.image}
      />
      <AlternativesForm
        onSubmit={(e) => {
          e.preventDefault()
          setIsSubmited(true)
          setTimeout(() => {
            onSubmit()
            setIsSubmited(false)
            setSelected(undefined)
            addResult(isCorrect)
          }, 2000)
        }}
      >
        <Widget.Content>
          <h1>{question.title}</h1>
        </Widget.Content>
        <Widget.Content>
          {question.alternatives.map((alternative, index) => {
            const alternativeID = `alternative_${index}`
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
            const isSelectedAlternative = selected === index

            return (
              <Widget.Topic
                as="label"
                key={alternativeID}
                htmlFor={alternativeID}
                data-selected={isSelectedAlternative}
                data-status={isSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeID}
                  name={`question_${i}`}
                  type="radio"
                  onClick={() => setSelected(index)}
                />
                {alternative}
              </Widget.Topic>
            )
          })}
        </Widget.Content>
        <Widget.Content>
          <Button type="submit" disabled={!isSelected}>
            Confirmar
          </Button>
        </Widget.Content>
        {isCorrect && isSubmited &&
          <Widget.Content>
            <p>
              <FiCheckCircle color={db.theme.colors.success}/>
              &nbsp;Acertou!
            </p>
          </Widget.Content>}
        {!isCorrect && isSubmited &&
          <Widget.Content>
            <p>
              <FiXCircle color={db.theme.colors.wrong}/>
              &nbsp;Errou!
            </p>
          </Widget.Content>}
      </AlternativesForm>
    </Widget>
  )
}

const ResultWidget = ({ results, router, db }) => {
  return (
    <>
      <Widget>
        <Widget.Header>
          <Link href="/" style={{ color: db.theme.colors.contrastText }}>
            <FiChevronLeft size={20}/>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <h1>Resultado</h1>
        </Widget.Header>

        <Widget.Content>
          <ul>
            {results.map((result, index) => {
              return (
                <li key={index}>
                  {`Pergunta ${index + 1}:`} &nbsp;
                  {result && <FiCheckCircle color={db.theme.colors.success}/>}
                  {!result && <FiXCircle color={db.theme.colors.wrong}/>}
                </li>
              )
            })}
          </ul>
        </Widget.Content>
        <Widget.Content>
          <p>
            {router.query.name}, você acertou {results.reduce((sum, result) => { return result ? sum + 1 : sum }, 0)} respostas!
          </p>
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

const handleSubmit = (i, n, setScreenState, setI) => {
  if (i + 1 === n) {
    setScreenState(screenStates.RESULT)
  } else {
    setI(i + 1)
  }
}

export default function QuizScreen({ db }) {
  const router = useRouter()
  const [i, setI] = useState(0)
  const n = db.questions.length
  const question = db.questions[i]
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const [results, setResults] = useState([])

  const addResult = (result) => {
    setResults([
      ...results,
      result
    ])
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 2000)
  }, [])

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          {screenState === screenStates.LOADING && <LoadingWidget db={db}/>}
          {screenState === screenStates.QUIZ &&
            <QuestionWidget
              router={router}
              i={i} n={n}
              question={question}
              onSubmit={() => { handleSubmit(i, n, setScreenState, setI) }}
              addResult={addResult}
              db={db}
            />
          }
          {screenState === screenStates.RESULT && <ResultWidget results={results} router={router} db={db}/>}
          <Footer/>
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/ziguifrido/netflix-quiz"/>
      </QuizBackground>
    </>
  )
}
