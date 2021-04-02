import React, { useState } from 'react';
import { firebaseClient } from '../firebaseClient';
import styles from '../styles/Login.module.css'

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <input
            autoComplete="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Id"
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button
          className={styles.button}
          onClick={async () => {
            props.setLoading(true);
            await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
            window.location.href = '/';
            props.setLoading(false);
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
};
