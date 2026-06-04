import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Icon from './ui/Icon';

const PAGES = [
  { key: 'about', path: '/' },
  { key: 'services', path: '/services' },
  { key: 'projects', path: '/projects' },
  { key: 'knowledge', path: '/knowledge' },
];

export default function Nav() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="nav">
        <div className="wrap">
          <a className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img
              className="mark-totoro"
              src={theme === 'light' ? '/assets/img/TotoroLogoBlack.png' : '/assets/img/TotoroLogoWhite.png'}
              alt=""
              aria-hidden="true"
            />
            Luis Miguel Álvarez
          </a>
          <nav className="nav-links">
            {PAGES.map((p, i) => (
              <NavLink
                key={p.key}
                to={p.path}
                end={p.path === '/'}
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              >
                <span className="num">0{i + 1}</span>{t.nav[p.key]}
              </NavLink>
            ))}
          </nav>
          <div className="nav-tools">
            <button className="tool-btn lang-btn" onClick={toggleLang} aria-label="Toggle language">
              <b>{lang.toUpperCase()}</b>
              <span className="lang-label" style={{ opacity: 0.5 }}>/{lang === 'en' ? 'ES' : 'EN'}</span>
            </button>
            <button className="tool-btn" onClick={toggleTheme} aria-label="Toggle theme">
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>
            <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>
      <div className={'mobile-menu' + (open ? ' open' : '')}>
        {PAGES.map((p) => (
          <NavLink
            key={p.key}
            to={p.path}
            end={p.path === '/'}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setOpen(false)}
          >
            {t.nav[p.key]}
          </NavLink>
        ))}
      </div>
    </>
  );
}
