import React, { useContext } from 'react';
import styled from '@emotion/styled';
import VerseContext from '../VerseContext';

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
  margin-bottom: 1rem;
`;

const VerseFilter = () => {
  const {
    state: { filter },
    dispatch,
  } = useContext(VerseContext);

  return (
    <Input
      placeholder="Search the Bible"
      value={filter}
      onChange={(e) => dispatch({
        type: 'SET_FILTER',
        payload: e.target.value,
      })}
    />
  );
};

export default VerseFilter;
