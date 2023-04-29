import React from 'react';
import styled from '@emotion/styled';

import store from './store';

import { observer } from 'mobx-react';

import './App.css';

import VerseInfo from './components/VerseInfo';
import VerseFilter from './components/VerseFilter';
import VerseTable from './components/VerseTable';

const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

function App() {
  return (
    <PageContainer>
      <Title>The Bible: TL;DR</Title>
      {!store.selectedItem && (
        <div>
          <VerseFilter />
          <VerseTable />
        </div>
      )}
      {store.selectedItem && (
        <VerseInfo
          onBack={() => store.setSelectedItem(null)}
        />
      )}
    </PageContainer>
  );
}

export default observer(App);
