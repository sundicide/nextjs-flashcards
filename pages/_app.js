import Head from 'next/head'

import '../styles/globals.css'
import { AuthProvider } from '../auth';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { fas } from '@fortawesome/free-solid-svg-icons'
import { faHome, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'

import Header from "../components/Header"
import { useState } from 'react';

library.add(faHome, faSignOutAlt, faUser)

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="root-wrapper">
        <div className="root">
          <Head>
            <title>My page title</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
          <AuthProvider>
            <Header />
            <Component {...pageProps} setLoading={setIsLoading} />
          </AuthProvider>
        </div>
      </div>
      <div className={`backdrop ${isLoading ? "active" : ""}`}></div>
    </>
  )
}

export default MyApp
