import React from 'react';
import styled from '@emotion/styled';
import useStore from '../store';

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
  margin-bottom: 1rem;
`;

const VerseFilter = () => {
  const filter = useStore(state => state.filter);
  const setFilter = useStore(state => state.setFilter);

  return (
    <Input
      placeholder="Search the Bible"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

export default VerseFilter;
