import React from 'react';
import {  Modal } from 'antd';



const SubModal = ({isModalOpen, setIsModalOpen, title, children}) => {

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         {children} 
      </Modal>
    </>
  );
};
export default SubModal;