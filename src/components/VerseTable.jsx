import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import VerseRow from './VerseRow';
import { useDispatch, useSelector } from 'react-redux';

const VerseTable = () => {
  const dispatch = useDispatch();
  const bible = useSelector(state => state.bible);
  const filter = useSelector(state => state.filter);

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
          {bible
            .filter((verse) => verse.text.toLowerCase().includes(filter.toLowerCase()))
            .slice(0, 20)
            .map((verse) => (
              <VerseRow
                key={verse.book_id + verse.chapter + verse.verse}
                onSelect={(verse) =>
                    dispatch({
                      type: 'SET_SELECTED_ITEM',
                      payload: verse,
                    })
                }
                verse={verse}
              />
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VerseTable;
