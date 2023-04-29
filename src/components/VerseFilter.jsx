import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import store from '../store';

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
  margin-bottom: 1rem;
`;

const VerseFilter = () => {
  return (
    <Input
      placeholder="Search the Bible"
      value={store.filter}
      onChange={(e) => store.setFilter(e.target.value)}
    />
  );
};

export default observer(VerseFilter);
