import { useParams } from "next/navigation";
import ViewCase from "~/components/case/view";
import { api } from "~/utils/api";

export default function ViewContainer() {
    const params = useParams<{ id: string }>()
    const surgeCase = api.cases.findOne.useQuery({ id: Number(params?.id ?? 0) });
    
  return (
      <>
          <ViewCase surgCase={surgeCase.data?.data} />
    </>
  );
}


