import { useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto">
      <h1 className="text-lg">Wordle clone</h1>
    </div>
  );
}

export default App;
