import BottomNav from './BottomNav';

export default function MobileShell({ children, bg = 'bg-emoji', showNav = true }) {
  return (
    <div className="phone-shell">
      <div className={`phone-content ${bg} ${showNav ? 'with-nav' : 'no-nav'}`}>
        {children}
      </div>
      {showNav && <BottomNav />}
    </div>
  );
}
