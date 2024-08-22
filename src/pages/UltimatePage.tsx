import React from 'react';
import { Layout } from 'antd';
const { Header } = Layout;
const App: React.FC = () => {
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
      </Header>
    </Layout>
  );
};

export default App;