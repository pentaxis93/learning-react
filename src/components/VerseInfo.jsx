import PropTypes from 'prop-types'
import { string } from 'prop-types';
import { number } from 'prop-types';
import React, { useContext } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import VerseContext from '../VerseContext';

// VerseInfo is a component that renders the details of a single verse
const VerseInfo = ({ onBack }) => {
  const { selectedItem: { book_name, chapter, verse, text } } = useContext(VerseContext);

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
      <Button
        color='primary'
        onClick={() => onBack()}
        variant='contained'
      >
        Back to the other verses
      </Button>
      <TableContainer
        component ={Paper}
        sx={{
          marginBottom: '1rem',
          marginTop: '1rem',
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
              <TableCell>{tanakh}</TableCell>
              <TableCell>Tanakh, The Holy Scriptures</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{ylt}</TableCell>
              <TableCell>Young's Literal Translation</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{emphbbl}</TableCell>
              <TableCell>The Emphasized Bible</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{darby}</TableCell>
              <TableCell>1890 Darby Bible</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{leb}</TableCell>
              <TableCell>The Lexham English Bible</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{asv}</TableCell>
              <TableCell>American Standard Version</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        color='primary'
        onClick={() => onBack()}
        variant='contained'
      >
        Back to the other verses
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

export default VerseInfo;
