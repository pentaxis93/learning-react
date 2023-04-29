import React from 'react';
import styled from '@emotion/styled';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

import './App.css';

import VerseInfo from './components/VerseInfo';
import VerseFilter from './components/VerseFilter';
import VerseTable from './components/VerseTable';

const bibleReducer = (state = {
  bible: [],
  filter: '',
  selectedItem: null,
}, action) => {
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
      return state;
  }
};

const store = createStore(bibleReducer);

const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

function App() {
  const dispatch = useDispatch();
  const bible = useSelector(state => state.bible)
  const selectedItem = useSelector(state => state.selectedItem)

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

  if (!bible) {
    return <div>Loading...</div>;
  };

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
          onBack={() => dispatch({
            type: 'SET_SELECTED_ITEM',
            payload: null
          })}
        />
      )}
    </PageContainer>
  );
}

export default () => <Provider store={store}><App /></Provider>;
