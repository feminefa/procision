import { Form, notification } from "antd/lib";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateCase from "~/components/case/create";
import { api } from "~/utils/api";
import dayjs from 'dayjs';

export default function EditCaseContainer() {
  const [form] = Form.useForm();
  const updateCaseMutation = (api.cases?.updateOne as any).useMutation();
  const [notificationApi, contextHolder] = notification.useNotification();
  const params = useParams<{ id: string }>()
  const surgeCaseData = (api.cases.findOne as any).useQuery({ id: Number(params?.id ?? 0) });
  const [patientQuery, setPatientQuery] = useState<string>('');
  const [surgeonQuery, setSurgeonQuery] = useState<string>('');
  const surgeCase = (api.cases?.create as any)?.useMutation();
  const patients = (api.patient?.findMany as any)?.useQuery({
    search:  patientQuery
  });
  
  const surgeons = (api.surgeon?.findMany as any)?.useQuery({
    search:  surgeonQuery
  });

  const updateCase = (payload: {
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
   console.log('PAYYLOAD', payload)
    updateCaseMutation.mutate({ id: Number(params.id), payload });
    console.log('CASSE', surgeCase.error, surgeCase.data)

  }

  useEffect(() => {
    if (updateCaseMutation.error) {
       notificationApi.open({
        type: 'error',
        message: 'Error!',
        description:
        updateCaseMutation.error?.message,
      });
    } else {
      if (updateCaseMutation.data) {
        notificationApi.open({
          message: 'Case Updated',
          description:
            <>Case successfully updated!' <Link href={`/case/${surgeCase.data.data.id}`}>View Case</Link></>,
        });
        // form.resetFields();
      }
     }
  }, [updateCaseMutation.error, updateCaseMutation.data])

  useEffect(() => {
    if (surgeCase.error) {
       notificationApi.open({
        type: 'error',
        message: 'Error!',
        description:
        surgeCase.error.message,
      });
    } else {
      if (surgeCase.data?.data) {
        const caseData = surgeCase.data.data;
        console.log('CASED DATA', caseData.dateOfSurgery)
        caseData.dateOfSurgery = dayjs(caseData.dateOfSurgery);
        console.log('CASED DATA', caseData.dateOfSurgery)
        form.setFieldsValue(caseData)
      }
     }
  }, [surgeCase.error, surgeCase.data])
 
  return (
    <>
      {contextHolder}
          <CreateCase  surgeons={surgeons?.data?.data} filterSurgeons={setSurgeonQuery} filterPatients={setPatientQuery} patients={patients?.data?.data}form={form} title={`Edit Case ID - ${surgeCaseData.data?.data?.externalId}` } handleSubmit={updateCase} />
    </>
  );
}


