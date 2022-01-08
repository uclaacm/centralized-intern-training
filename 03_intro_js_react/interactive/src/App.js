import React, { useState } from 'react';


function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
        <div> You have {counter} upvotes.  </div>
        <button onClick={() => setCounter(counter+1)}>Upvote! </button>
        <button onClick={() => setCounter(counter-1)}>Downvote! </button>
    </div>
  );
}

export default App;
