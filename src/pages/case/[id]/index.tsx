import Head from "next/head";
import ViewContainer from "~/containers/case/viewContainer";
export default function Home() {

  return (
    <>
      <Head>
        <title>Surgical Case Data</title>
       
      </Head>
    <ViewContainer />
    </>
  );
}
