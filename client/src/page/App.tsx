import React, {useEffect, useState, useRef} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {CATEGORIES_PRODUCTS, DELETE_PRODUCT, PRODUCTS, UPDATE_PRODUCT} from '../api';
import ProTable from '@ant-design/pro-table';
import {message, Button} from 'antd';
import columns from './columns';
import {Product, Category} from '../types';
import AddModal from './components/AddModal';
import DetailModal from './components/DetailModal';

function App() {
  const [dataSource, setDataSource] = useState<Array<Product>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const {data, error, loading} = useQuery(CATEGORIES_PRODUCTS);
  const [deleteProduct] =  useMutation(DELETE_PRODUCT);
  const [updateProduct] =  useMutation(UPDATE_PRODUCT);
  const actionRef = useRef<any>();
  useEffect(() => {
    if(error) {
      return message.error(error);
    }
    if(data) {
      const {getProducts, getCategories}= data;
      const products = getProducts.map((p: Product) => ({...p, categoryId: p.category!.id}))
      setDataSource(products);
      setCategories(getCategories);
    }
  }, [data, error]);

  const cols = columns.map(c => {
    if(c.dataIndex === 'categoryId') {
      if(categories.length > 0) {
        const map = new Map();
        for (const category of categories) {
          map.set(category.id, category.name);
        }
        c.valueEnum = map;
      }
    }
    if(c.valueType === 'option') {
      c.render = (text, record, _, action: any) => [
        <DetailModal key="view" record={record} />,
        <Button
          key="editable"
          type="link"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </Button>,
        <Button
          key="delete"
          type="link"
          danger
          onClick={async () => {
            const {id} = record;
            const {data} = await deleteProduct({variables: {id}, refetchQueries: [{
              query: PRODUCTS
            }]});
            if(data) {
              message.success('删除成功');
            }
          }}
        >
          删除
        </Button>
      ];
    }
    return c;
  })
  return (
    <div>
      <ProTable
        dataSource={dataSource}
        rowKey="id"
        loading={loading}
        columns={cols}
        actionRef={actionRef}
        headerTitle="产品列表"
        search={false}
        options={{
          setting: false
        }}
        editable={{
          type: 'multiple',
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
          onSave: async (k, record, row) => {
            const {categoryId:category,  id, name} = record;
            const {data} = await updateProduct({variables: {category, id, name}, refetchQueries: [{
              query: PRODUCTS
            }]});
            if(data) {
              message.success('编辑成功');
            }
          }
        }}
        pagination={false}
        scroll={{
          y: 'calc(100vh - 250px)'
        }}
        toolBarRender={() => [
          <AddModal key="add" categories={categories} />
        ]}
      />
    </div>
  )
}

export default App;
