import React from 'react';
import styled from '@emotion/styled';

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
  margin-bottom: 1rem;
`;

const VerseFilter = ({ filter, setFilter }) => (
  <Input
    placeholder="Search the Bible"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  />
)

export default VerseFilter;
