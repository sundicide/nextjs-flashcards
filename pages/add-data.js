import React, { useState } from "react";
import nookies from "nookies";
import { useRouter } from 'next/router'
import { firebaseAdmin } from "../firebaseAdmin";
import { firebaseClient } from "../firebaseClient";
import styles from '../styles/Home.module.css'

import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    // the user is authenticated!
    // FETCH STUFF HERE
    return {
      props: {
        message: `Your email is ${email} and your UID is ${uid}.`,
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

function AddData(
  props
) {
  const [part, setPart] = useState("6")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function submit() {
    setIsLoading(true)
    const db = await firebaseClient.firestore()

    const docData = await db.collection(`part${part}`).get()
    const currentQuestion = question.trim()
    const currentAnswer = answer.trim()
    const datas = []
    docData.forEach(d => datas.push({
      ...d.data(),
      id: d.id
    }))
    const found = datas.find(d => d.question === currentQuestion)
    if (found) {
      console.log("found = ", found)
      alert("already exists");
      setIsLoading(false)
    } else {
      db
        .collection(`part${part}`)
        .add({
          question: currentQuestion,
          answer: currentAnswer,
          added_date: new Date().toString()
        })
        .then(docRef => {
          console.log(docRef.id)
          alert('good')
          setQuestion("")
          setAnswer("")
        })
        .catch(error => {
          console.error("Error adding document: ", error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <div>
      <div style={{margin: "10px"}}>
        <span>Part: </span>
        <input
          onChange={e => setPart(e.target.value)}
          value={part}
        />
      </div>
      <div style={{margin: "10px"}}>
        <span>Question: </span>
        <textarea
          onChange={e => setQuestion(e.target.value)}
          value={question}
          rows="4" cols="50"
        />
      </div>
      <div style={{margin: "10px"}}>
        <span>Answer: </span>
        <textarea
          onChange={e => setAnswer(e.target.value)}
          value={answer}
          rows="10" cols="50"
        />
      </div>

      <div>
        <button
          disabled={isLoading}
          onClick={() => submit()}
        >submit</button>
      </div>
    </div>
  );
}

export default AddData;