import { useNavigate } from 'react-router-dom';
import MobileShell from '../components/MobileShell';
import { getUser, getUserStats, logout } from '../store/storage';
import { getAvatarColor, getInitial } from '../data/seedListings';

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = getUser();
  const stats = getUserStats(user?.id);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { label: 'Edit profile', action: () => navigate('/profile/edit') },
    { label: 'Saved listings', action: () => navigate('/saved') },
    { label: 'Notifications', action: () => {} },
    { label: 'Help & support', action: () => {} },
  ];

  return (
    <MobileShell>
      <div className="page-header">
        <div className="page-header-left">
          <div className="eyebrow">YOUR ACCOUNT</div>
          <h1 className="page-title">Profile</h1>
        </div>
      </div>

      <div className="profile-center">
        <div className="profile-avatar" style={{ background: getAvatarColor(user?.name || 'U') }}>
          {getInitial(user?.name)}
        </div>
        <div className="profile-name">{user?.name || 'Guest'}</div>
        <div className="profile-role">
          {user?.role ? `${user.role} · ${user.location}` : 'Complete your profile to connect with sellers'}
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-num">{stats.messages}</div>
          <div className="stat-label">MESSAGES</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{stats.posted}</div>
          <div className="stat-label">POSTED</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{stats.upvoted}</div>
          <div className="stat-label">UPVOTED</div>
        </div>
      </div>

      <div className="menu-list">
        {menuItems.map((item) => (
          <button key={item.label} type="button" className="menu-item" onClick={item.action}>
            {item.label}
            <span className="menu-chevron">›</span>
          </button>
        ))}
      </div>

      <div className="sign-out-wrap">
        <button type="button" className="btn btn-secondary" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </MobileShell>
  );
}
