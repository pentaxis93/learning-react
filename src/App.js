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
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
      >Select</Button>
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

// VerseInfo is a component that renders the details of a single verse
const VerseInfo = ({ book_name, chapter, verse, text, onBack }) => {
  // Set up state for all the translations
  const [asv, setAsv] = React.useState('');
  const [darby, setDarby] = React.useState('');
  const [emphbbl, setEmphbbl] = React.useState('');
  const [leb, setLeb] = React.useState('');
  const [tanakh, setTanakh] = React.useState('');
  const [ylt, setYlt] = React.useState('');

  const apiKey = process.env.REACT_APP_BIBLIA_API_KEY;
  console.log(apiKey);

  React.useEffect(() => {
    // Fetch all the translations when the component loads
    fetch(`https://api.biblia.com/v1/bible/content/ASV.txt.json?passage=${book_name}${chapter}.${verse}&key=${apiKey}`)
      .then(resp => resp.json())
      .then(data => setAsv(data.text));
    fetch(`https://api.biblia.com/v1/bible/content/DARBY.txt.json?passage=${book_name}${chapter}.${verse}&key=${apiKey}`)
      .then(resp => resp.json())
      .then(data => setDarby(data.text));
    fetch(`https://api.biblia.com/v1/bible/content/EMPHBBL.txt.json?passage=${book_name}${chapter}.${verse}&key=${apiKey}`)
      .then(resp => resp.json())
      .then(data => setEmphbbl(data.text));
    fetch(`https://api.biblia.com/v1/bible/content/LEB.txt.json?passage=${book_name}${chapter}.${verse}&key=${apiKey}`)
      .then(resp => resp.json())
      .then(data => setLeb(data.text));
    fetch(`https://api.biblia.com/v1/bible/content/TANAKH.txt.json?passage=${book_name}${chapter}.${verse}&key=${apiKey}`)
      .then(resp => resp.json())
      .then(data => setTanakh(data.text));
    fetch(`https://api.biblia.com/v1/bible/content/YLT.txt.json?passage=${book_name}${chapter}.${verse}&key=${apiKey}`)
      .then(resp => resp.json())
      .then(data => setYlt(data.text));
  }, []);

  return (
    <div>
      <h1>{book_name + " " + chapter + ":" + verse}</h1>
      <TableContainer
        component ={Paper}
        sx={{
          marginBottom: '1rem',
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Text</TableCell>
              <TableCell>Translation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{text}</TableCell>
              <TableCell>King James Version</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{asv}</TableCell>
              <TableCell>American Standard Version</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{darby}</TableCell>
              <TableCell>1890 Darby Bible</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{emphbbl}</TableCell>
              <TableCell>The Emphasized Bible</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{leb}</TableCell>
              <TableCell>The Lexham English Bible</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{tanakh}</TableCell>
              <TableCell>Tanakh, The Holy Scriptures</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{ylt}</TableCell>
              <TableCell>Young's Literal Translation</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
  margin-bottom: 1rem;
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
