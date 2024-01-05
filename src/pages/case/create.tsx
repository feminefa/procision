import Head from "next/head";
import CreateCaseContainer from "~/containers/case/createCaseContainer";
export default function Home() {

  return (
    <>
      <Head>
        <title>Add Surgical Case</title>
       
      </Head>
    <CreateCaseContainer />
    </>
  );
}
