import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import Link from '../src/components/Link'

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' }
            }}
            initial="hidden"
            animate="show"
          >
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
          <Widget
            as={motion.section}
            transition={{ delay: 0.25, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' }
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>Quizes da galera</h1>
            </Widget.Header>
            <Widget.Content>
              {db.external.map((url, index) => {
                const [projectName, githubUser] = url
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.')

                return (
                  <Widget.Topic as={Link} key={index} href={`/quiz/${githubUser}___${projectName}`}>
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic>
                )
              })}
            </Widget.Content>
          </Widget>
          <motion.section
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' }
            }}
            initial="hidden"
            animate="show"
          >
            <Footer/>
          </motion.section>
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/ziguifrido/netflix-quiz"/>
      </QuizBackground>
    </>
  )
}
