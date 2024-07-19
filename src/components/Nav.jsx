import { hamburger } from '../assets/icons';
import { navLinks } from '../constants/index';

const Nav = () => {
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