import { Form, notification } from "antd/lib";
import Link from "next/link";
import { useEffect, useState } from "react";
import CreateCase from "~/components/case/create";
import { api } from "~/utils/api";


export default function CreateCaseContainer() {
  const [form] = Form.useForm();
  const [patientQuery, setPatientQuery] = useState<string>('');
  const [surgeonQuery, setSurgeonQuery] = useState<string>('');
  const surgeCase = (api.cases?.create as any)?.useMutation();
  const patients = (api.patient?.findMany as any)?.useQuery({
    search:  patientQuery
  });
  const surgeons = (api.surgeon?.findMany as any)?.useQuery({
    search:  surgeonQuery
  });
  const [notificationApi, contextHolder] = notification.useNotification();
  

  const createCase = (payload: {
    externalId: string;
    patientId: number;
    procedure: string;
    surgeonId: number;
    dateOfSurgery: Date;
    diagnosis: string;
    icd10Code: string;
  }) => {
   
    payload.surgeonId = Number(payload.surgeonId);
    payload.patientId = Number(payload.patientId);
    payload.dateOfSurgery = new Date(Date.parse(payload.dateOfSurgery.toString()));
   
    surgeCase.mutate(payload);

  }

  useEffect(() => {
    if (surgeCase.error) {
       notificationApi.open({
        type: 'error',
        message: 'Error!',
        description:
        surgeCase.error.message,
      });
    } else {
      if (surgeCase.data) {
        notificationApi.open({
          message: 'Case Added',
          description:
            <>Case successfully added!' <Link href={`/case/${surgeCase.data.data.id}`}>View Case</Link></>,
        });
        form.resetFields();
      }
     }
  }, [surgeCase.error, surgeCase.data])
 
  return (
    <>
      {contextHolder}
          <CreateCase surgeons={surgeons?.data?.data} filterSurgeons={setSurgeonQuery} filterPatients={setPatientQuery} patients={patients?.data?.data} form={form} handleSubmit={createCase} />
    </>
  );
}


