import React from 'react';
import { Button, message } from 'antd';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT, PRODUCTS } from '../../api';

const AddModal = (props: any) => {
  const {categories} = props;
  const options = new Map();
  categories.map((p: any) => options.set(p.id, p.name));
  const [addProduct] =  useMutation(ADD_PRODUCT);

  return (
    <ModalForm
      title="新增产品"
      trigger={<Button type="primary">新增</Button>}
      submitter={{
        resetButtonProps: {
          type: 'dashed',
        },
        submitButtonProps: {
          style: {
            display: 'block',
          },
        },
      }}
      modalProps={{
        destroyOnClose: true
      }}
      onFinish={async (values) => {
        const {data} = await addProduct({variables: values, refetchQueries: [{
          query: PRODUCTS
        }]});
        if(data) {
          message.success('提交成功');
        }
        return true;
      }}
    >
      <ProFormText
        name="name"
        label="名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
        rules={[{required: true}]}
      />
      <ProFormSelect
        valueEnum={options}
        name="categoryId"
        label="分类"
        placeholder="请选择分类"
        rules={[{required: true}]}
      />
    </ModalForm>
  );
};

export default AddModal;