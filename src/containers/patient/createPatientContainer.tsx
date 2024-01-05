import { Form, notification } from "antd/lib";
import Link from "next/link";
import { useEffect } from "react";
import CreatePatient from "~/components/patient/create";
import { api } from "~/utils/api";

export default function CreatePatientContainer() {
  const [form] = Form.useForm();
  const patient = api.patient?.create?.useMutation();
  const [notificationApi, contextHolder] = notification.useNotification();
  const createPatient = (payload: Record<string, unknown>) => {
    delete payload.customizeGender;
    patient.mutate(payload);
  }

  useEffect(() => {
    if (patient.error) {
       notificationApi.open({
        type: 'error',
        message: 'Error!',
        description:
        patient.error.message,
      });
    } else {
      if (patient.data) {
        notificationApi.open({
          message: 'Patient Added',
          description:
            <><span>Patient successfully added!</span> </>,
        });
        form.resetFields();
      }
     }
  }, [patient.error, patient.data])
 
  return (
    <>
      {contextHolder}
          <CreatePatient form={form} handleSubmit={createPatient} />
    </>
  );
}


