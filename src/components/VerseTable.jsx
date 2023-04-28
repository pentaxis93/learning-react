import bible from '../kjv.json';
import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import VerseRow from './VerseRow';

const VerseTable = ({ filter, setSelectedItem }) => (
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
        {bible
          .filter((verse) => verse.text.toLowerCase().includes(filter.toLowerCase()))
          .slice(0, 20)
          .map((verse) => (
            <VerseRow
              key={verse.book_id + verse.chapter + verse.verse}
              onSelect={() => setSelectedItem(verse)}
              verse={verse}
            />
          ))
        }
      </TableBody>
    </Table>
  </TableContainer>
);

export default VerseTable;
