import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./modulos/home/Home";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
