import { Link, useLocation } from 'react-router-dom';

function HomeIcon({ active }) {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function MessagesIcon({ active }) {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}

function ProfileIcon({ active }) {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export default function BottomNav() {
  const { pathname } = useLocation();

  const tabs = [
    { to: '/browse', label: 'Home', Icon: HomeIcon },
    { to: '/messages', label: 'Messages', Icon: MessagesIcon },
    { to: '/profile', label: 'Profile', Icon: ProfileIcon },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(({ to, label, Icon }) => {
        const active = pathname.startsWith(to);
        return (
          <Link key={to} to={to} className={`nav-item ${active ? 'active' : ''}`}>
            <Icon active={active} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
