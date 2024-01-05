import { AutoComplete, Button, Input, Space, Table, } from 'antd/lib';
import type { SelectProps } from 'antd/es/select';
import { useEffect, useState } from 'react';
import type { ColumnsType, TablePaginationConfig,  } from 'antd/es/table';
import Link from 'next/link';
import { type ISurgicalCase } from '~/_shared/interface';
import { Skeleton } from 'antd/lib';
import { type DebouncedFunc, debounce } from 'lodash';

export interface SearchCasesProps {
  // onSelect: (value:  Record<string, unknown>) => void;
  cases: Record<string, unknown>[],
  pagination: { total: number, perPage?: number;  page?: number},
    handleSearch: (val: string, onFinish: (result: SelectProps<object>['options'])=>void) => void;
    handleDeleteClicked: (id: number)=>void;
  loading?: boolean;
}
interface DataType extends ISurgicalCase {
    key: string | number;
  }



  

export default function SearchCases({ handleSearch, cases, loading, pagination, handleDeleteClicked }: SearchCasesProps) {
  let searchDebounce: DebouncedFunc<()=>void>;
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const [result, setResult] = useState<DataType[]>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Case ID',
      dataIndex: 'externalId',
      key: '1',
      render: (text, record) => <Link href={`/case/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Patient Name',
      dataIndex: 'patient',
      key: 'pxName',
      
    },
    {
      title: 'Surgeon Name',
      dataIndex: 'surgeon',
      key: 'surgName',
      responsive: ['sm'],
    },
    {
        title: 'Procedure',
        key: 'procedure',
        dataIndex: 'procedure',
      },
    
    {
      title: 'Action',
      key: 'action',
      responsive: ['sm'],
      render: (d) => (
          <Space size="middle">
          <Link href={`/case/${d.id}/`}>View</Link>
          <Link href={`/case/${d.id}/edit`}>Edit</Link>
          <Button type={"link"} onClick={()=>handleDeleteClicked(d.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  function onSearch(value: string) {
    searchDebounce?.cancel();
    searchDebounce = debounce(() => {
     
        handleSearch(value,
          (values: SelectProps<object>['options']) => {
            setOptions(values)
          }
        )
    
      setOptions([])
    }, 1000, { trailing: true });
    searchDebounce();
  };
  useEffect(() => {
    const rsl: ISurgicalCase[] = cases as unknown as ISurgicalCase[];
    setResult(rsl?.map((d: ISurgicalCase, index: number) => {
      return {
        key: index,
        ...d
      }
    }))
  }, [cases])
    
  
  return (
    <>
     
        <div className="container flex flex-col items-center gap-4 p-8">
          <h1 className="text-2xl font-bold">Surgical Cases</h1>

          <AutoComplete
          popupMatchSelectWidth={252}
       
          options={options}
          // onSelect={onSelect}
          onSearch={onSearch}
          size="large"
          className='w-[400px]'
          placeholder={`e.g. Dr. Brown's cases`}
         
      >
        {/* <Input.Search size="large"  className='m-b-10 w-100' placeholder="Search cases..." enterButton /> */}
        </AutoComplete>
       
        {!loading && <Table title={()=>`${pagination?.total} cases found`} columns={columns} pagination={{ position: ['topCenter', "bottomCenter"] }} dataSource={result} />}
        {loading && <div className={'w-[100%] p-t-[100px]'} ><Skeleton /></div>}
        </div>
     
    </>
  );
}
