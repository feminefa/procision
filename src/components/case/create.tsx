import { Button, Form, Input, Space, Select, DatePicker, AutoComplete } from "antd/lib";
import { type IPatient, type ISurgeon } from "~/_shared/interface";

export interface CasePayloadProps {
        externalId: string;
        patientId: number;
        procedure: string;
        surgeonId: number;
        dateOfSurgery: Date;
        diagnosis: string;
        icd10Code: string;
}
export interface ICreateCaseProps {
    handleSubmit: (data: CasePayloadProps) => void;
    form: Form;
    title?: string;
    surgeons: ISurgeon[];
    patients: IPatient[];
    filterSurgeons: (query: string) => void;
    filterPatients: (query: string) => void;
}
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

export default function CreateCase({ handleSubmit, form, title, patients, surgeons, filterPatients, filterSurgeons }: ICreateCaseProps) {
    

    
    const onPatientSelected = (value: string) => {
        switch (value) {
          case 'male':
            form.setFieldsValue({ note: 'Hi, man!' });
            break;
          case 'female':
            form.setFieldsValue({ note: 'Hi, lady!' });
            break;
          case 'other':
            form.setFieldsValue({ note: 'Hi there!' });
            break;
          default:
        }
    };
    
    const onReset = () => {
        form.resetFields();
      };
  return (
    <>
     
        <main className="flex min-h-screen flex-col items-center">
            <div className="container flex flex-col items-center gap-4 p-8">
            <h1 className="text-2xl font-bold">{title ?? 'Create Cases'}</h1>
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={handleSubmit}
      style={{ maxWidth: 600 }}
                  >
        <Form.Item name="externalId" label="External Id" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name="procedure" label="Procedure" rules={[{ required: true }]}>
            <Input />
                      </Form.Item>
                      <Form.Item name="diagnosis" label="Diagnosis" rules={[{ required: true }]}>
            <Input />
                      </Form.Item>
                      <Form.Item name="dateOfSurgery" label="Date/Time" rules={[{ required: true }]}>
                          <DatePicker showTime={true} />
                      </Form.Item>
                      <Form.Item name="icd10Code" label="ICD 10 Code" rules={[{ required: true }]}>
            <Input />
                      </Form.Item>
            <Form.Item name="surgeonId" label="Surgeon" rules={[{ required: true }]}>
                <Select
                        className="w-[300px]"
                        placeholder="Select a patient"
                        onChange={onPatientSelected}
                        allowClear
                        >
                        {surgeons?.map((s)=> <Option key={s.id} value={s.id}>{s.name} - {s.specialty}</Option>)}
                </Select>
                      </Form.Item>
                      <Form.Item name="patientId" hidden></Form.Item>
                      <Form.Item name="surgeonId" hidden></Form.Item>
            <Form.Item name="patientIdHolder" label="Patient" rules={[{ required: true }]}>
                <AutoComplete
                    options={patients?.map((p)=> ({value: p.name, label: p.name, key: p.id }))}
                              style={{ width: 200 }}
                              onSelect={(v, option)=>form.setFieldsValue({surgeonId: Number(option.key) })}
                    onSearch={(text) => filterPatients(text)}
                    placeholder="Search Patient"
                />
        {/* <Select
          placeholder="Select a patient"
          onChange={onPatientSelected}
          allowClear
        >
           {patients?.map((p)=> <Option key={p.id} value={p.id}>{p.name} - {p.externalId}</Option>)}
        </Select> */}
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          
        </Space>
      </Form.Item>
    </Form>
            </div>
        </main>
    </>
  );
}
