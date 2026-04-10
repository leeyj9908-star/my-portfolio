import { useNavigate, useLocation } from 'react-router-dom';

const menus = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="navbar bg-base-100 border-b border-white/10 sticky top-0 z-50 px-4 md:px-8">
      <div className="navbar-start">
        <button
          onClick={() => navigate('/')}
          className="text-lg font-bold bg-gradient-to-r from-[#FFFFFF] to-[#6AA8D4] bg-clip-text text-transparent cursor-pointer"
        >
          Portfolio
        </button>
      </div>
      <div className="navbar-end gap-1">
        {menus.map((menu) => (
          <button
            key={menu.path}
            onClick={() => navigate(menu.path)}
            className={`btn btn-ghost btn-sm normal-case font-medium rounded-full px-4 ${
              location.pathname === menu.path
                ? 'bg-white/10 text-base-content font-bold'
                : 'text-base-content/60 hover:text-base-content hover:bg-white/5'
            }`}
          >
            {menu.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
