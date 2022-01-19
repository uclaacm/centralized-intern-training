import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
      <p> You have {counter} upvotes.  </p>
        <button onClick={() => setCounter(counter+1)}>Upvote! </button>
        <button onClick={() => setCounter(counter-1)}>Downvote! </button>
      </header>
    </div>
  );
}

export default App;
