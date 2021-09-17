import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/client';
// ApolloClient 是一个浏览器端查询graphql接口的工具
import Layout from './layout';
import App from './page/App';
import './index.css';
import 'antd/dist/antd.css';
import '@ant-design/pro-table/dist/table.css';

const client: any = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});


ReactDOM.render(
  <ApolloProvider client={client} >
    <Layout>
      <App />
    </Layout>
  </ApolloProvider>,
  document.getElementById('root')
);
