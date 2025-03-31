import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";

function App() {
  return (
    <>
      <BrowserRouter path="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/Login" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
