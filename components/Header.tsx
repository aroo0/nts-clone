import NavBar from "./NavBar";
import RadioBar from "./RadioBar";



const Header: React.FC = () => {
  return (
    <header className="w-full">
      <NavBar />
      <RadioBar />
    </header>
  );
};

export default Header;
