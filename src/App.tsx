import React from "react";
import WordRow from "./component/WordRow";

function App() {
  return (
    <div className="mx-auto w-96">
      <header className="border-b border-black/40 pb-2 my-2">
        <h1 className="text-4xl text-center">Wordle clone</h1>
      </header>

      <main>
        <WordRow letters="hel" />
        <WordRow letters="hell" />
        <WordRow letters="hello" />
      </main>
    </div>
  );
}

export default App;
