import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'

class Problems {
  question = ''
  answer = ''
  constructor(question, answer) {
    this.question = question
    this.answer = answer
  }
}

const problemsList = [
  new Problems('drink, water / good, health', 'I think that drinking enough water is good for health.'),
  new Problems('bonus good / outstanding employee', 'In my opinion, bonuses are effective rewards for outstanding employees.'),
  new Problems('creativity / painter', 'I agree that creativity is the most important quality for a painter.'),
  new Problems('children / advice / parent', 'I agree that children need to get advice from their parents.'),
  new Problems('children / advice / parent', 'I agree that children need to get advice from their parents.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
]

export default function Home() {
  const [localProblemLists, setLocalProblemLists] = React.useState([...problemsList]);


  function doInit() {
    setLocalProblemLists(problemsList)
  }
  const doRaffle = () => {
    let copyProblemList = [...localProblemLists]
    const newProblems = []
    for (let i = 0; i < localProblemLists.length; i++) {
      const newIdx = parseInt((Math.random() * copyProblemList.length), 10)
      newProblems.push(copyProblemList.splice(newIdx, 1)[0])
    }
    setLocalProblemLists(newProblems)
  }
  const hideElem = (i) => {
    const newProblems = [...localProblemLists]
    newProblems.splice(i, 1)
    setLocalProblemLists(newProblems)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <button onClick={doInit}>Init</button>
          <button onClick={doRaffle}>Raffle</button>
        </div>
        <div className={styles.grid}>
          {localProblemLists.map((d, i) => (
            <div key={i} className={styles.card}>
              <button onClick={() => hideElem(i)}>hide</button>
              <a href="#">
                <h3>{d.question}</h3>
              </a>
              <p className={styles.answer}>{d.answer}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
