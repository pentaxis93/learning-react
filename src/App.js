import './App.css';

function App() {
  return (
    <div
      style={{
        margin: 'auto',
        width: 800,
        paddingTop: '1rem',
      }}
    >
      <h1 className='title'>Wise Up</h1>
      <table width="100%">
        <thead>
          <th>Love</th>
          <th>Sex</th>
        </thead>
        <tbody>
          <tr>
            <td>Love</td>
            <td>Sex</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
