import './App.css';
// American Standard Version
import bible from './asv.json';
// King James Version
// import bible from './kjv.json';
import PropTypes from 'prop-types'
import { string } from 'prop-types';
import { number } from 'prop-types';
import React from 'react';

const VerseRow = ({ verse, onSelect }) => (
  <tr>
    <td>{verse.book_name}</td>
    <td>{verse.chapter + ":" + verse.verse}</td>
    <td>{verse.text}</td>
    <td>
      <button
        onClick={() => onSelect(verse)}
      >Select</button>
    </td>
  </tr>
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

const VerseInfo = ({ book_name, chapter, verse, onBack }) => (
  <div>
    <h1>{book_name + " " + chapter + ":" + verse}</h1>
    <button onClick={() => onBack()}>Back</button>
  </div>
)

VerseInfo.propTypes = {
  book_name: string.isRequired,
  chapter: number.isRequired,
  verse: number.isRequired,
  onBack: PropTypes.func.isRequired,
}

function App() {
  const [filter, setFilter] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <div style={{ margin: 'auto', width: 800, paddingTop: '1rem'}}>
      <h1 className='title'>The Bible: TL;DR</h1>
      <div
        style={{
          display: 'grid',
          gridColumnGap: '1rem',
        }}
      >
      {!selectedItem && (
        <div>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
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
                  <VerseRow
                    key={verse.book_id + verse.chapter + verse.verse}
                    onSelect={() => setSelectedItem(verse)}
                    verse={verse}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
        )}
        {selectedItem && (
          <VerseInfo
            {...selectedItem}
            onBack={() => setSelectedItem(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
