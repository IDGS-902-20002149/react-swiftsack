import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./modulos/home/Home";
import Navbar from "./Navbar";
import AuthComponent from "./modulos/login/AuthComponent";
import ProfileComponent from "./modulos/login/ProfileComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<AuthComponent />} />
          <Route path="/profile" element={<ProfileComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
