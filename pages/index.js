import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'
import datas from "../data/part6.json"

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

export default function Home() {
  const [localProblemLists, setLocalProblemLists] = React.useState([...datas]);

  const getTags = () => datas.reduce((accu, curr) => {
    curr.tag.forEach(t => accu.add(t))
    return accu
  }, new Set())


  const doInit = () => {
    setLocalProblemLists(datas)
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
    const newList = datas.filter(d => d.answer.includes(e.target.value) )
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
    const newProblems = [...datas]
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
              <h3 className={styles.question}>{d.question}</h3>
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
