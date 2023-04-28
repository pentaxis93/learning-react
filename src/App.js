import React from 'react';
import styled from '@emotion/styled';

import './App.css';

import VerseInfo from './components/VerseInfo';
import VerseFilter from './components/VerseFilter';
import VerseTable from './components/VerseTable';
import VerseContext from './VerseContext';

const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

function App() {
  const [filter, setFilter] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <VerseContext.Provider
      value={{
        filter,
        setFilter,
        selectedItem,
        setSelectedItem,
      }}
    >
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
    </VerseContext.Provider>
  );
}

export default App;
