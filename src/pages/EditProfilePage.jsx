import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileShell from '../components/MobileShell';
import Toast from '../components/Toast';
import { getUser, setUser } from '../store/storage';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const user = getUser();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || '',
    location: user?.location || '',
  });
  const [toast, setToast] = useState('');

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...user, ...form });
    setToast('Profile saved!');
    setTimeout(() => navigate('/profile'), 1200);
  };

  return (
    <MobileShell showNav={false}>
      <form className="form-page" onSubmit={handleSave}>
        <button type="button" className="back-btn" onClick={() => navigate('/profile')}>
          ← Back
        </button>
        <div className="eyebrow">YOUR ACCOUNT</div>
        <h1 className="page-title" style={{ marginBottom: 24 }}>Edit profile</h1>

        <div className="form-group">
          <label className="form-label" htmlFor="name">Full name</label>
          <input id="name" className="form-input" value={form.name} onChange={update('name')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input id="email" type="email" className="form-input" value={form.email} onChange={update('email')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone</label>
          <input id="phone" type="tel" className="form-input" value={form.phone} onChange={update('phone')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="role">I am a</label>
          <select id="role" className="form-select" value={form.role} onChange={update('role')} required>
            <option value="">Select...</option>
            <option value="Buyer">Buyer / Investor</option>
            <option value="Seller">Business Owner / Seller</option>
            <option value="Broker">Broker</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="location">Location</label>
          <input id="location" className="form-input" placeholder="City, State" value={form.location} onChange={update('location')} required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Save profile</button>
        </div>
      </form>
      <Toast message={toast} onDone={() => setToast('')} />
    </MobileShell>
  );
}
