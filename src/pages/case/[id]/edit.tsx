import Head from "next/head";
import EditCaseContainer from "~/containers/case/editCaseContainer";

import { api } from "~/utils/api";

export default function Home() {
  const user = api.user.first.useQuery();

  return (
    <>
      <Head>
        <title>Edit Surgical Case</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditCaseContainer />
    </>
  );
}
