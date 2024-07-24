import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { AuthContext } from './AuthProvider';
import { hamburger } from '../assets/icons';
import { navLinks } from '../constants/index';
import { auth } from '../firebase';

const Nav = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate('/auth');
      } catch (error) {
        console.error("Error logging out: ", error);
      }
    };

  return (
    <header className="padding-x py-8 sticky z-10 w-full bg-black shadow-lg">
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          <h1 className="text-white text-bold text-xl">Black Craft Studio</h1>
        </a>
        <ul className="flex-1 flex justify-center items-center gap-8 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-white transition-colors duration-300 hover:text-red-600"
              >
                {item.label}
              </a>
                
            </li>
          ))}
        </ul>
        <h5 className="text-white cursor-pointer font-montserrat" onClick={handleLogout}>Logout</h5>
        <div className="hidden max-lg:flex items-center">
          <img 
            src={hamburger} 
            alt="Hamburger Menu" 
            width={25}
            height={25}
            className="cursor-pointer"
          />
        </div>
      </nav>
    </header>
  )
}

export default Nav;