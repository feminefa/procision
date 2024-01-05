
import {  Layout, Menu } from 'antd/lib';
import Link from "next/link";
import Image from 'next/image';
 const { Header: AntHeader, } = Layout;
const menuItems = [{
    key: 'Home',
    label: <Link href={'/'}>Home</Link>,
},
{
    key: 'PatientAdd',
    label: <Link href={'/patient/create'}>Add Patient</Link>,
},
{
    key: 'CaseAdd',
    label: <Link href={'/case/create'}>Add Case</Link>,
}];


export default function Header({ title, theme }: { title?: string, theme?: 'dark' | 'light' }) {
  
  return (
    <>
        {/* <Head>
            <title>{title ?? 'Surgical Case Data'}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head> */}
        <AntHeader className="bg-white flex">
              <div className="procision" >
             PROCISION
          </div>
            <Menu
            theme={theme ?? 'light'}
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={menuItems}
            style={{ flex: 1, width: '100%' }}
            />
      </AntHeader>
    </>
  );
}
