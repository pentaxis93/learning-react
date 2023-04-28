import './App.css';
import React from 'react';
import styled from '@emotion/styled';
import VerseInfo from './components/VerseInfo';
import VerseFilter from './components/VerseFilter';
import VerseTable from './components/VerseTable';

const Title = styled.h1`
  text-align: center;
`;
const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

function App() {
  const [filter, setFilter] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <Container>
      <Title>The Bible: TL;DR</Title>
      {!selectedItem && (
        <div>
          <VerseFilter filter={filter} setFilter={setFilter} />
          <VerseTable filter={filter} setSelectedItem={setSelectedItem} />
        </div>
      )}
      {selectedItem && (
        <VerseInfo
          {...selectedItem}
          onBack={() => setSelectedItem(null)}
        />
      )}
    </Container>
  );
}

export default App;
