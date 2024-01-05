import { Button, InputNumber, Form, Input, Space, Select } from "antd/lib";

export interface ICreatePatientProps {
    handleSubmit: (data: Record<string, unknown>) => void;
    form: Form,
}
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

export default function CreatePatient({ handleSubmit, form }: ICreatePatientProps) {

  const onGenderSelected = (value: string) => {
      form.setFieldsValue({ gender: value });
  };
  const onReset = () => {
        form.resetFields();
  };
  return (
    <>
     
        <main className="flex min-h-screen flex-col items-center">
            <div className="container flex flex-col items-center gap-4 p-8">
            <h1 className="text-2xl font-bold">Create Patient</h1>
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
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
            </Form.Item>
            <Form.Item name="photoUrl" label="Photo Url" rules={[{ required: true }]}>
            <Input />
            </Form.Item>
            

        <Form.Item name="age" label="Age" rules={[{ required: true }]}>
            <InputNumber min={0} max={150} />
            </Form.Item>
            <Form.Item hidden={true} name="gender" label="Gender" rules={[{ required: true }]}></Form.Item>
          
        <Form.Item name="customizeGender" label="Gender" rules={[{ required: true }]}>
            <Select
                placeholder="Select gender"
                onChange={onGenderSelected}
                defaultValue={form.getFieldValue('gender')}
                allowClear
                >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Others">Others</Option>
                </Select>
            </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
            </Form.Item>  
            
            
            <Form.Item name="street" label="Street Address" rules={[{ required: true }]}>
            <Input />
            </Form.Item> 
            <Form.Item name="city" label="City" rules={[{ required: true }]}>
            <Input />
            </Form.Item> 
            <Form.Item name="state" label="State" rules={[{ required: true }]}>
            <Input />
            </Form.Item> 
            <Form.Item name="zip" label="Zip" rules={[{ required: true }]}>
            <Input />
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
