import {Layout} from 'antd';
const { Header, Content, Footer } = Layout;

interface IProps {
  children?: any;
}

const BaseLayout = (props: IProps) => {
  const {children} = props;
  return <Layout>
  <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
    <div style={{fontSize: 20, fontWeight: 'bolder', color: 'white'}}>GraphQL</div>
  </Header>
  <Content className="site-layout" style={{ padding: 0, marginTop: 64 }}>
    <div className="site-layout-background" style={{ padding: 24, height: 'calc(100vh - 112px)' }}>
      {children}
    </div>
  </Content>
  <Footer style={{ textAlign: 'center', height: 30 }}>Ant Design ©2018 Created by Ant UED</Footer>
</Layout>
}
export default BaseLayout;