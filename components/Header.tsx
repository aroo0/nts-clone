import NavBar from "./NavBar"
import Radio from "./RadioBar"

interface HeaderProps {
  
}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="w-full">
       <NavBar />
       <Radio />

    </div>
   )
}

export default Header