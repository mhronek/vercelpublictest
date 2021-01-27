import Head from 'next/head'
import Navbar from '../components/Navbar'
import Bms from '../components/bms';
import useSWR from 'swr';
import Link from 'next/link';
import auth0 from './api/utils/auth0'; 
import Fauna from '../components/Fauna';

export default function Home( { user }  ) {
  return (
    <div>
      <Head>
        <title>Vercel Public Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={ user } />
      <main>
        { user && (
            <>
              <h1>Vercel Public Test</h1>
              <div className="my-12">
                  <h1 className="text-blue-300 text-2xl">
                      Logged in as <img src={ user.picture } /> { user.nickname }
                  </h1>
              </div>
            </>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps( context ) {
  const session = await auth0.getSession( context.req );

  if ( session?.user ) {

    const user = await Fauna.getUserByEmail ( session.name ); 

    if ( user.email == null ) {
      
      const user = await Fauna.createUser ( session.sub, session.name, session.nickname ); 
    
    } else {
      
    }

  } else {
  
  }
  return {
    props: {
      user: session?.user || null
    }
  }
}
