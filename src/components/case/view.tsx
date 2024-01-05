import { AutoComplete, Avatar, Input } from 'antd/lib';
import type { SelectProps } from 'antd/es/select';
import { useState } from 'react';
import { Space, Card } from 'antd/lib';
import Link from 'next/link';
import { type ISurgicalCase } from '~/_shared/interface';
import Meta from 'antd/lib/card/Meta';
import { isMobile } from "react-device-detect";

export interface ViewCaseProps {
  surgCase?: ISurgicalCase;
}

export default function ViewCase({surgCase}: ViewCaseProps) {
  
  return (
    <>
     
      <div className="container flex flex-col items-center">
        
          <h1 className="text-2xl font-bold">Case #{surgCase?.id} </h1>
        <div className='flex space-x-4 flex-start'>
        <div className="grid grid-rows-1 lg:grid-flow-col grid-cols-3 gap-4  flex flex-col content-center">
            <div className="row-span-1  col-span-3 md:col-span-1 ">
             <Card
                hoverable
                className='hidden  md:block   w-[400px]'
                cover={<img alt="example" src={surgCase?.patient?.photoUrl } />}
              >
              </Card>
            <div className='flex flex-row md:hidden justify-center items-center'><Avatar size={'large'} className=' w-[200px] h-[200px]' src={surgCase?.patient?.photoUrl } /></div>
            </div>
            <div className='flex flex-col col-span-3 sm:col-span-2 gap-4'>
              <div className=" ">
                <Card
                  title="Patient Info"
                hoverable
                className=' m-w-[400px]'
              
                >
                   <p><strong>ID:</strong> { surgCase?.patient?.externalId }</p>
                  <p><strong>Name:</strong> { surgCase?.patient?.name }</p>
                  <p><strong>Gender:</strong> {surgCase?.patient?.gender}</p>
                 
                  <p><strong>Age:</strong> { surgCase?.patient?.age }</p>
                </Card>
              </div>
              <div className=" ">
                <Card
                  title="Case Info"
                hoverable
                className=' m-w-[400px]'
              
                >
                   <p><strong>ID:</strong> { surgCase?.externalId }</p>
                   <p><strong>Procedure:</strong> { surgCase?.procedure }</p>
                  <p><strong>Diagnosis:</strong> {surgCase?.diagnosis}</p>
                  <p><strong>IDC 10 Code:</strong> { surgCase?.icd10Code }</p>
                  <p><strong>Time:</strong> {new Date(String(surgCase?.dateOfSurgery))?.toLocaleDateString()} {new Date(String(surgCase?.dateOfSurgery))?.toLocaleTimeString()}</p>
                 
                 
                </Card>
              </div>
              <div className=" ">
                <Card
                  title="Surgeon Info"
                hoverable
                className=' m-w-[400px]'
              
                >
                   <p><strong>ID:</strong> { surgCase?.surgeon?.id }</p>
                  <p><strong>Name:</strong> { surgCase?.surgeon?.name }</p>
                  <p><strong>NPI Number:</strong> {surgCase?.surgeon?.npi}</p>
                  <p><strong>Specialty:</strong> {surgCase?.surgeon?.specialty}</p>
                 
                
                </Card>
              </div>
          </div>
        </div>
          
        
          </div>
        </div>
     
    </>
  );
}
