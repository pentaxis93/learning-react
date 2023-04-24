import './App.css';
// American Standard Version
import bible from './asv.json';
// King James Version
// import bible from './kjv.json';
import PropTypes from 'prop-types'
import { string } from 'prop-types';
import { number } from 'prop-types';
import React from 'react';

const VerseRow = ({ verse }) => (
  <tr>
    <td>{verse.book_name}</td>
    <td>{verse.chapter + ":" + verse.verse}</td>
    <td>{verse.text}</td>
  </tr>
)

VerseRow.propTypes = {
  verse: PropTypes.shape({
    book_name: string,
    chapter: number,
    verse: number,
    text: string
  }),
}

function App() {
  const [filter, setFilter] = React.useState('');

  return (
    <div style={{ margin: 'auto', width: 800, paddingTop: '1rem'}}>
      <h1 className='title'>The Bible: TL;DR</h1>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)} />
      <table width="100%">
        <thead>
          <tr>
            <th>Book</th>
            <th>Verse</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {bible
            .filter((verse) => verse.text.toLowerCase().includes(filter.toLowerCase()))
            .slice(0, 20)
            .map((verse) => (
              <VerseRow verse={verse} key={verse.book_id + verse.chapter + verse.verse} />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
