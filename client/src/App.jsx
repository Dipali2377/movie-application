import "./App.css";
import AddMovie from "./components/AddMovie";
import ListMovies from "./components/MovieList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <AddMovie />
      {/* <AddMovie /> */}
      <ListMovies />
    </>
  );
}

export default App;
