import React from 'react';
import styled from '@emotion/styled';

import useStore from './store';

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
  const selectedItem = useStore(state => state.selectedItem)
  const setSelectedItem = useStore(state => state.setSelectedItem)

  return (
    <PageContainer>
      <Title>The Bible: TL;DR</Title>
      {!selectedItem && (
        <div>
          <VerseFilter />
          <VerseTable />
        </div>
      )}
      {selectedItem && (
        <VerseInfo
          onBack={() => setSelectedItem(null)}
        />
      )}
    </PageContainer>
  );
}

export default App;
