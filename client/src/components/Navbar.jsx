import "./Navbar.css";
import profileLogo from "../assets/profile.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🎬 MovieMania</div>
      <div className="navbar-profile">
        <img src={profileLogo} alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
