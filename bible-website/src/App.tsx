import BibleReader from "./BibleReader";
import "./App.css";

const App = () => {
  return (
    <div>
      <div className="banner">
        <h1 className="reader-title">🌴 Oasis bible</h1>
      </div>
      <BibleReader />
    </div>
  );
};

export default App;
