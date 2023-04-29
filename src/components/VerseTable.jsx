import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import VerseRow from './VerseRow';

import store from '../store';

import { observer } from 'mobx-react';

const VerseTable = () => {
  return (
    <TableContainer component ={Paper}>
      <Table width="100%">
        <TableHead>
          <TableRow>
            <TableCell>Book</TableCell>
            <TableCell>Verse</TableCell>
            <TableCell>Text (King James Version)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store.filteredVerses
            .slice(0, 20)
            .map((verse) => (
              <VerseRow
                key={verse.book_id + verse.chapter + verse.verse}
                onSelect={(verse) => store.setSelectedItem(verse)}
                verse={verse}
              />
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default observer(VerseTable);
