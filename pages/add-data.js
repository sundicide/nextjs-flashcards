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

  async function submit() {
    const db = await firebaseClient.firestore()
    db
      .collection(`part${part}`)
      .add({
        question,
        answer,
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
        <input
          onChange={e => setQuestion(e.target.value)}
          value={question}
        />
      </div>
      <div style={{margin: "10px"}}>
        <span>Answer: </span>
        <input
          onChange={e => setAnswer(e.target.value)}
          value={answer}
        />
      </div>

      <div>
        <button onClick={() => submit()}>submit</button>
      </div>
    </div>
  );
}

export default AddData;