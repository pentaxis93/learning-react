import React from 'react';
import styled from '@emotion/styled';

import './App.css';

import VerseInfo from './components/VerseInfo';
import VerseFilter from './components/VerseFilter';
import VerseTable from './components/VerseTable';
import VerseContext from './VerseContext';

const bibleReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BIBLE':
      return {
        ...state,
        bible: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'SET_SELECTED_ITEM':
      return {
        ...state,
        selectedItem: action.payload,
      };
    default:
      throw new Error('No action');
  }
};

const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

function App() {
  const [state, dispatch] = React.useReducer(bibleReducer, {
    filter: '',
    bible: [],
    selectedItem: null,
  });

  React.useEffect(() => {
    fetch("/the-bible-tldr/kjv.json")
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: 'SET_BIBLE',
          payload: data
        })
      );
  }, []);

  if (!state.bible) {
    return <div>Loading...</div>;
  };

  return (
    <VerseContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <PageContainer>
        <Title>The Bible: TL;DR</Title>
        {!state.selectedItem && (
          <div>
            <VerseFilter />
            <VerseTable />
          </div>
        )}
        {state.selectedItem && (
          <VerseInfo
            onBack={() => dispatch({
              type: 'SET_SELECTED_ITEM',
              payload: null
            })}
          />
        )}
      </PageContainer>
    </VerseContext.Provider>
  );
}

export default App;
