import { useEffect, useState } from "react";
import SearchCases from "~/components/case/searchCases";
import { api } from "~/utils/api";
import { Modal, notification } from 'antd/lib';



export default function SearchCaseContainer() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<number>();
  const [cases, setCases] = useState<Record<string,unknown>[]>([]);
  const [notificationApi, contextHolder] = notification.useNotification();
  const [query, setQuery] = useState<string>('');
  const surgCases = api.cases.search?.useQuery({ query });
  const deleteSurgcase = api.cases.deleteOne?.useMutation();


  useEffect(() => {
   
    if (surgCases.data?.data) {
      setCases(surgCases.data?.data ?? []);
    }
  }, [surgCases.data?.data])

  useEffect(() => {
    if (deleteSurgcase.error) {
      notificationApi.open({
        type: 'error',
        message: 'Error!',
        description:
        deleteSurgcase.error.message,
      });
    } else {
      if (deleteSurgcase.data) {
        notificationApi.open({
          message: 'Case Added',
          description:
            <>Case successfully delete!'</>,
        });
        // form.resetFields();
      }
     }
  }, [deleteSurgcase.error, deleteSurgcase.data])

  const handleDeleteOk = () => {
    deleteSurgcase.mutate({id: selectedCase})
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteClicked = (id: number) => {
    setSelectedCase(id);
    setIsDeleteModalOpen(true);
  };
  return (
    <>
      {contextHolder}
        <SearchCases handleDeleteClicked={handleDeleteClicked} loading={!surgCases.data} pagination={surgCases.data?.meta?.pagination} cases={cases} handleSearch={setQuery} />
        <Modal title="Delete Case" open={isDeleteModalOpen} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
        <p>Are you sure you want to delete this case?</p>
      </Modal>
      </>
  );
}


