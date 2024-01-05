import Head from "next/head";
import BrowseCases from "~/components/case/searchCases";
import HomeContainer from "~/containers/case/searchCaseContainer";
export default function Home() {
 

  return (
    <>
      <Head>
        <title>Surgical Case Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <HomeContainer/>
    </>
  );
}
