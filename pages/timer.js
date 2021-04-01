import { useState } from "react"

import useInterval from '../lib/useInterval'
import styles from '../styles/Timer.module.css'

export default function Timer() {
  const [time, setTime] = useState(60)
  const [isPaused, setIsPaused] = useState(true)

  const intervalRef = useInterval(() => {
    if (time > 0) {
      setTime(time - 1)
    } else {
      clearInterval(intervalRef.current)
    }
  }, isPaused ? null : 1000)

  function go() {
    setIsPaused(false)
  }

  function reset() {
    setTime(60)
    setIsPaused(true)
  }

  return (
    <div className={styles.root}>
      <div className={styles.buttonWrapper}>
        <button onClick={() => go()}>go</button>
        <button onClick={() => reset()}>reset</button>
      </div>
      <div className={styles.body}>
        {time}
      </div>
    </div>
  )
}
