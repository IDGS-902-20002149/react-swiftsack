import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./modulos/home/Home";
import Navbar from "./Navbar";
import AuthComponent from "./modulos/login/AuthComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<AuthComponent />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
