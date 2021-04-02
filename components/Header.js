import Link from 'next/link';
import { useRouter } from 'next/router'

import { useAuth } from '../auth';
import { firebaseClient } from '../firebaseClient'
import FontAwesomeIcon from '../components/FontAwesomeIcon'
import styles from '../styles/Header.module.css'

export default function Header(props) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className={styles.root}>
      <div>
        <Link href="/" passHref>
          <FontAwesomeIcon className="icon" icon="home" />
        </Link>
      </div>
      <div className={styles.users}>
        {user ? (
          <Link href="/login">
            <FontAwesomeIcon
              className="icon"
              icon="sign-out-alt"
              onClick={
                async () => {
                  await firebaseClient
                    .auth()
                    .signOut()
                    .then(() => {
                      router.push("/");
                    });
                }
              }
            />
          </Link>
        ): (
          <Link href="/login">
            <FontAwesomeIcon className="icon" icon="user" />
          </Link>
        )}
      </div>
    </div>
  )
}
