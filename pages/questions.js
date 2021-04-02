import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { useRouter } from 'next/router'
import { firebaseAdmin } from "../firebaseAdmin";
import styles from '../styles/Questions.module.css'

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    // the user is authenticated!
    // FETCH STUFF HERE
    const db = firebaseAdmin.firestore()
    const doc5 = await db.collection("part5").get()
    const datas5 = []
    doc5.forEach(d => datas5.push(d.data()))
    const doc6 = await db.collection("part6").get()
    const datas6 = []
    doc6.forEach(d => datas6.push(d.data()))

    return {
      props: {
        message: `Your email is ${email} and your UID is ${uid}.`,
        datas5,
        datas6,
      },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {},
    };
  }
};

const DEFAULT_PARTNUMBER = 5

function Questions(
  props
) {
  const [localProblemLists, setLocalProblemLists] = useState(props.datas5)
  const [partNumber, setPartNumber] = useState(DEFAULT_PARTNUMBER)
  const [searchText, setSearchText] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    if (partNumber === 5) {
      setLocalProblemLists(props.datas5)
    } else if (partNumber === 6) {
      setLocalProblemLists(props.datas6)
    } else {
      setLocalProblemLists(DEFAULT_PARTNUMBER)
    }
  }, [partNumber])
  const router = useRouter();
  console.log(props.datas)

  const changePart = (paramPart) => {
    if (!paramPart) {
      setPartNumber(DEFAULT_PARTNUMBER)
    } else {
      setPartNumber(paramPart)
    }
  }
  const doInit = () => {
    setPartNumber(partNumber)
  }
  const doShuffle = () => {
    let copyProblemList = [...localProblemLists]
    const newProblems = []
    for (let i = 0; i < localProblemLists.length; i++) {
      const newIdx = parseInt((Math.random() * copyProblemList.length), 10)
      newProblems.push(copyProblemList.splice(newIdx, 1)[0])
    }
    setLocalProblemLists(newProblems)
  }
  const doSearch = (e) => {
    setSearchText(e.target.value)
  }

  const getDatas = () => localProblemLists.filter(d => d.answer.toLowerCase().includes(searchText.toLowerCase()) || d.question.toLowerCase().includes(searchText.toLowerCase()))

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {doSearch(e)}
  }

  return (
    <div className={styles.container} onKeyDown={handleKeyDown}>
      <main className={styles.main}>
        <div className={styles.buttons}>
          <button onClick={doInit}>Init</button>
          <button onClick={doShuffle}>Shuffle</button>
        </div>
        <div className={styles.buttons}>
          <button onClick={e => changePart(5)}>Part5</button>
          <button onClick={e => changePart(6)}>Part6</button>
        </div>
        <section className={styles.searches}>
          <input onChange={doSearch} type="text"/>
          <button>search</button>
        </section>
        <div className={styles.grid}>
          {getDatas().map((d, i) => (
            <div key={i} className={styles.card}>
              <button onClick={() => hideElem(i)}>hide</button>
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
  );
}

export default Questions;