import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'

class Problems {
  tag = []
  question = ''
  answer = ''
  constructor(tag, question, answer) {
    this.tag = tag
    this.question = question
    this.answer = answer
  }
}

const problemsList = [
  new Problems(['water', 'health'], 'drink, water / good, health', 'I think that drinking enough water is good for health.'),
  new Problems(['in-my-opinion'], 'bonus good / outstanding employee', 'In my opinion, bonuses are effective rewards for outstanding employees.'),
  new Problems(['i-agree'], 'creativity / painter', 'I agree that creativity is the most important quality for a painter.'),
  new Problems(['i-agree'], 'children / advice / parent', 'I agree that children need to get advice from their parents.'),
  new Problems(['i-agree'], 'students / mobile phones / classroom', "I disagree that students shouldn't be allowed to have mobile phones in the classroom."),
  new Problems(['i-agree'], 'studying abroad / young age', "I disagree that studying abroad at a young age is good."),
  new Problems(['i-agree', 'cloth'], 'buying cloth / shop', "I prefer buying my clothes in a shop to shopping on the Internet."),
]

export default function Home() {
  const [localProblemLists, setLocalProblemLists] = React.useState([...problemsList]);
  const getTags = () => problemsList.reduce((accu, curr) => {
    curr.tag.forEach(t => accu.add(t))
    return accu
  }, new Set())


  const doInit = () => {
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
  const doSearch = (e) => {
    const newList = problemsList.filter(d => d.answer.includes(e.target.value) )
    setLocalProblemLists(newList)
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {doSearch(e)}
  }
  const hideElem = (i) => {
    const newProblems = [...localProblemLists]
    newProblems.splice(i, 1)
    setLocalProblemLists(newProblems)
  }
  const filterKey = (e) => {
    const newProblems = [...problemsList]
    setLocalProblemLists(newProblems.filter(d => d.tag.includes(e.target.dataset.value)));
  }
  return (
    <div className={styles.container} onKeyDown={handleKeyDown}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <button onClick={doInit}>Init</button>
          <button onClick={doRaffle}>Raffle</button>
        </div>
        <section className={styles.searches}>
          <input onChange={doSearch} type="text"/>
          <button>search</button>
        </section>
        <section className={styles.tags}>
          {Array.from(getTags()).map(key => (
            <div key={key} onClick={filterKey} data-value={key}>
              {key}
            </div>
          ))}
        </section>
        <div className={styles.grid}>
          {localProblemLists.map((d, i) => (
            <div key={i} className={styles.card}>
              <button onClick={() => hideElem(i)}>hide</button>
              <div>
                tags: {d.tag.toString()}
              </div>
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
