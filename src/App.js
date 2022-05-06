import "./styles/App.css";
import LoginButton from "./components/login";
import { Routes, Route} from "react-router-dom";
import Profile from "./components/profile";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<LoginButton/>} />
      <Route path="revival" element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
