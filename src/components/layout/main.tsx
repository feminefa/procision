
 import React, {  type ReactNode } from 'react';

import { Breadcrumb, Layout, Menu, theme } from 'antd/lib';
import Header from './header';


 const {  Content, Footer } = Layout;

export const MainLayout = ({ children, rest }: { children?: ReactNode, rest?: { theme: 'light' | 'dark'}}) => {


return (
  <>
   
    <Layout>
      <Header theme={rest?.theme ?? 'light'}  /> 
      <Content className='px-10'>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <main className="flex min-h-[80vh] min-w-screen flex-col items-center">
          { children }
          </main>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created for Procision</Footer>
      </Layout>
      
    </>
  );
};

export default MainLayout;