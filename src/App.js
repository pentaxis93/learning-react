import './App.css';
import genesis from './1-genesis.json';

function App() {
  return (
    <div
      style={{
        margin: 'auto',
        width: 800,
        paddingTop: '1rem',
      }}
    >
      <h1 className='title'>The Bible: TL;DR</h1>
      <table width="100%">
        <thead>
          <tr>
            <th>Book</th>
            <th>Verse</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {genesis.slice(0, 20).map((verse) => (
            <tr key={verse.book_id + verse.chapter + verse.verse}>
              <td>{verse.book_name}</td>
              <td>{verse.chapter + ":" + verse.verse}</td>
              <td>{verse.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
