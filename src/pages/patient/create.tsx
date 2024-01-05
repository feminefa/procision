import Head from "next/head";
import CreatePatientContainer from "~/containers/patient/createPatientContainer";
export default function Home() {

  return (
    <>
      <Head>
        <title>Add Patient</title>
      </Head>
    <CreatePatientContainer />
    </>
  );
}
