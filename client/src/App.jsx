import "./App.css";
import AddMovie from "./components/AddMovie";
import ListMovies from "./components/MovieList";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import UpdateMovie from "./components/UpdateMovie";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/" element={<ListMovies />} />
        <Route path="/updatemovie/:id" element={<UpdateMovie />} />
      </Routes>
    </>
  );
}

export default App;
