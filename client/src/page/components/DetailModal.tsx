import React from 'react';
import { Button, Card, Avatar, Space, List } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
const {Meta} = Card;
const AddModal = (props: any) => {
  const {record} = props;
  const {name: productName, category: {name: categoryName, products}} = record;
  return (
    <ModalForm
      title="产品详情"
      trigger={<Button type="link">详情</Button>}
      submitter={false}
    >
      <Space direction="horizontal" size="large" style={{width: '100%'}}>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[]}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={productName}
            description={`分类：${categoryName}`}
          />
        </Card>
        <Space direction="vertical" style={{width: '100%'}}>
          <h3 style={{textAlign: 'center'}}>此分类下的所有产品</h3>
          <List
            itemLayout="vertical"
            dataSource={products}
            renderItem={(p: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={p.name}
                  description="作者：不详"
                />
              </List.Item>
            )}
          />
        </Space>
      </Space>
    </ModalForm>
  );
};

export default AddModal;