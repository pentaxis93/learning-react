import './App.css';
// American Standard Version
// import bible from './asv.json';
// King James Version
import bible from './kjv.json';
import PropTypes from 'prop-types'
import { string } from 'prop-types';
import { number } from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

// VerseRow is a component that renders a single row of the table
const VerseRow = ({ verse, onSelect }) => (
  <tr>
    <td>{verse.book_name}</td>
    <td>{verse.chapter + ":" + verse.verse}</td>
    <td>{verse.text}</td>
    <td>
      <Button
        color='primary'
        onClick={() => onSelect(verse)}
        variant='contained'
      >Select</Button>
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

// VerseInfo is a component that renders the details of a single verse
const VerseInfo = ({ book_name, chapter, verse, text, onBack }) => {
  // Set up state for all the translations
  const [asv, setAsv] = React.useState('');
  const [darby, setDarby] = React.useState('');
  const [emphbbl, setEmphbbl] = React.useState('');
  const [leb, setLeb] = React.useState('');
  const [tanakh, setTanakh] = React.useState('');
  const [ylt, setYlt] = React.useState('');

  React.useEffect(() => {
    // Fetch all the translations when the component loads
    fetch(`https://api.biblia.com/v1/bible/content/ASV.txt.json?passage=${book_name}${chapter}.${verse}&key=f9b9a8427fa37172a565f9f4a56d2a0b`)
      .then(resp => resp.json())
      .then(data => setAsv(data.text));
    fetch(`https://api.biblia.com/v1/bible/content/DARBY.txt.json?passage=${book_name}${chapter}.${verse}&key=f9b9a8427fa37172a565f9f4a56d2a0b`)
      .then(resp => resp.json())
      .then(data => setDarby(data.text));
    fetch(`https://api.biblia.com/v1/bible/content/EMPHBBL.txt.json?passage=${book_name}${chapter}.${verse}&key=f9b9a8427fa37172a565f9f4a56d2a0b`)
      .then(resp => resp.json())
      .then(data => setEmphbbl(data.text));
    fetch(`https://api.biblia.com/v1/bible/content/LEB.txt.json?passage=${book_name}${chapter}.${verse}&key=f9b9a8427fa37172a565f9f4a56d2a0b`)
      .then(resp => resp.json())
      .then(data => setLeb(data.text));
    fetch(`https://api.biblia.com/v1/bible/content/TANAKH.txt.json?passage=${book_name}${chapter}.${verse}&key=f9b9a8427fa37172a565f9f4a56d2a0b`)
      .then(resp => resp.json())
      .then(data => setTanakh(data.text));
    fetch(`https://api.biblia.com/v1/bible/content/YLT.txt.json?passage=${book_name}${chapter}.${verse}&key=f9b9a8427fa37172a565f9f4a56d2a0b`)
      .then(resp => resp.json())
      .then(data => setYlt(data.text));
  }, []);

  return (
    <div>
      <h1>{book_name + " " + chapter + ":" + verse}</h1>
      <table>
        <thead>
          <tr>
            <th>Text</th>
            <th>Translation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>King James Version</td>
          </tr>
          <tr>
            <td>{asv}</td>
            <td>American Standard Version</td>
          </tr>
          <tr>
            <td>{darby}</td>
            <td>1890 Darby Bible</td>
          </tr>
          <tr>
            <td>{emphbbl}</td>
            <td>The Emphasized Bible</td>
          </tr>
          <tr>
            <td>{leb}</td>
            <td>The Lexham English Bible</td>
          </tr>
          <tr>
            <td>{tanakh}</td>
            <td>Tanakh, The Holy Scriptures</td>
          </tr>
          <tr>
            <td>{ylt}</td>
            <td>Young's Literal Translation</td>
          </tr>
        </tbody>
      </table>
      <Button
        color='primary'
        onClick={() => onBack()}
        variant='contained'
      >
        Back
      </Button>
    </div>
  )
}

VerseInfo.propTypes = {
  book_name: string.isRequired,
  chapter: number.isRequired,
  verse: number.isRequired,
  text: string.isRequired,
  onBack: PropTypes.func.isRequired,
}

const Title = styled.h1`
  text-align: center;
`;
const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;
const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

function App() {
  // filter is the value of the input box
  const [filter, setFilter] = React.useState('');
  // selectedItem is the verse that has been selected
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <Container>
      <Title>The Bible: TL;DR</Title>
      {!selectedItem && (
        <div>
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <table width="100%">
            <thead>
              <tr>
                <th>Book</th>
                <th>Verse</th>
                <th>Text (King James Version)</th>
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
    </Container>
  );
}

export default App;
