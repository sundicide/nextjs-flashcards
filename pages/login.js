import React, { useState } from 'react';
import Link from 'next/link';
import { firebaseClient } from '../firebaseClient';
import styles from '../styles/Login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default (_props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Link href="/">
          <FontAwesomeIcon className={styles.icon} icon='home' />
        </Link>
        <div className={styles.inputWrapper}>
          <span>ID: </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'Email'}
          />
        </div>
        <div className={styles.inputWrapper}>
          <span>PW: </span>
          <input
            type={'password'}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder={'Password'}
          />
        </div>
        <button
          onClick={async () => {
            await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
            window.location.href = '/';
          }}
        >
          Log in
        </button>
      </div>
      {/* <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .createUserWithEmailAndPassword(email, pass);
          window.location.href = '/';
        }}
      >
        Create account
      </button> */}
    </div>
  );
};