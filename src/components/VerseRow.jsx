import PropTypes from 'prop-types'
import { string } from 'prop-types';
import { number } from 'prop-types';
import React from 'react';
import { Button, TableCell, TableRow } from '@mui/material';

// VerseRow is a component that renders a single row of the table
const VerseRow = ({ verse, onSelect }) => (
  <TableRow>
    <TableCell>{verse.book_name}</TableCell>
    <TableCell>{verse.chapter + ":" + verse.verse}</TableCell>
    <TableCell>{verse.text}</TableCell>
    <TableCell>
      <Button
        color='primary'
        onClick={() => onSelect(verse)}
        variant='contained'
      >
        Select
      </Button>
    </TableCell>
  </TableRow>
)

VerseRow.propTypes = {
  verse: PropTypes.shape({
    book_name: string.isRequired,
    chapter: number.isRequired,
    verse: number.isRequired,
    text: string.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default VerseRow;
