import React from 'react';
import { useLocation } from 'react-router-dom';

const defaultItems = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

const Navbar = ({ navLinks }) => {
  const location = useLocation();
  const navbarStyle =
    'text-slate-900 transition hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-400';

  const navItems =
    Array.isArray(navLinks) && navLinks.length > 0 ? navLinks : defaultItems;

  const getNavHref = (href) => {
    if (!href) {
      return '#';
    }

    if (href.startsWith('#') && location.pathname !== '/') {
      return `/${href}`;
    }

    return href;
  };

  return (
    <nav className=" flex mx-auto items-center bg-[#0f172a] px-6 py-5 border-b-2 dark:border-slate-700/70 w-full fixed top-0 z-50">
      <ul className="flex w-[80%] mx-auto justify-end items-center sm:gap-10 gap-5 text-white font-normal flex-wrap">
        {navItems.map((item) => (
          <li key={`${item.label}-${item.href}`}>
            <a href={getNavHref(item.href)} className={navbarStyle}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
