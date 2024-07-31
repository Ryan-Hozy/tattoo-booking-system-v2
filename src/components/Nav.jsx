import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { AuthContext } from './AuthProvider';
import { hamburger } from '../assets/icons';
import { navLinks } from '../constants/index';
import { auth } from '../firebase';
import { BiLogOutCircle } from "react-icons/bi";

const Nav = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <header className="padding-x py-8 sticky z-10 w-full bg-black shadow-xl">
      <nav className="flex justify-between items-center max-container">
        <a href="/" className="no-underline">
          <h1 className="text-white text-bold text-xl">Black Craft Studio</h1>
        </a>
        <ul className="flex-1 flex justify-center items-center gap-8 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              {item.label === "Logout" ? (
                <button
                  onClick={handleLogout}
                  className="font-montserrat leading-normal text-lg text-white transition-colors duration-300 hover:text-red-600 no-underline bg-transparent border-none cursor-pointer"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  href={item.href}
                  className="font-montserrat leading-normal text-lg text-white transition-colors duration-300 hover:text-red-600 no-underline"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        
        <div className="relative hidden max-lg:flex items-center">
          <img 
            src={hamburger} 
            alt="Hamburger Menu" 
            width={25}
            height={25}
            className="cursor-pointer filter invert"
            onClick={toggleMenu}
          />
          {isMenuOpen && (
            <ul className="absolute right-0 top-full mt-2 w-48 bg-black text-white shadow-lg rounded-lg">
              {navLinks.map((item) => (
                <li key={item.label} className="border-b border-gray-700 last:border-none">
                  {item.label === "Logout" ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-red-600"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="block w-full px-4 py-2 text-white hover:bg-red-600"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
