import React from "react";
import WordRow from "./component/WordRow";

function App() {
  return (
    <div className="mx-auto w-96">
      <header className="border-b border-black/40 pb-2 my-2">
        <h1 className="text-4xl text-center">Wordle clone</h1>
      </header>

      <main className="grid grid-rows-6 gap-4">
        <WordRow letters="hello" />
        <WordRow letters="solar" />
        <WordRow letters="penny" />
        <WordRow letters="snack" />
        <WordRow letters="store" />
        <WordRow letters="he" />
      </main>
    </div>
  );
}

export default App;
