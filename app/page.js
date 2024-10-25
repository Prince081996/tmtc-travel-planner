
import { getServerSession } from 'next-auth';
import { authOptions } from './conf/auth';
import { redirect } from 'next/navigation';
import SignIn from './components/SignIn';
import Head from 'next/head';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <Head>
        <title>City Information App</title>
        <meta name="description" content="Get city information including weather, places to visit, and country details." />
      </Head>
      <main>
       {!session &&  <SignIn/> }
      </main>
    </div>
  );
}
