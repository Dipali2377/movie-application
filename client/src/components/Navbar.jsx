import "./Navbar.css";
import profileLogo from "../assets/profile.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🎬 MovieMania</div>
      <Link to={"/"}>
        <div>Movies List</div>
      </Link>
      <div className="navbar-profile">
        <img src={profileLogo} alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
