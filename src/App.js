import Main from "./screens/Main";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Main />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
