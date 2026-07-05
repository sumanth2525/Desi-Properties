import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileShell from '../components/MobileShell';
import Toast from '../components/Toast';
import { getUser, addListing } from '../store/storage';
import { CATEGORIES, LISTING_FEE } from '../data/seedListings';

export default function PostListingPage() {
  const navigate = useNavigate();
  const user = getUser();
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({
    title: '',
    businessName: '',
    type: 'sell',
    category: 'Motel',
    price: '',
    location: '',
    lat: '33.749',
    lng: '-84.388',
    description: '',
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const listing = {
      id: `listing-${Date.now()}`,
      title: form.title,
      businessName: form.businessName,
      type: form.type,
      category: form.category,
      price: Number(form.price),
      priceLabel: form.type === 'lease' ? '/mo' : '',
      location: form.location,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      description: form.description,
      tags: [form.category, form.type === 'lease' ? 'Lease' : 'For sale'],
      upvotes: 0,
      verified: false,
      ownerId: user.id,
      ownerName: user.name,
      ownerPhone: user.phone || '(000) 000-0000',
      ownerEmail: user.email || 'seller@example.com',
      postedAt: new Date().toISOString().split('T')[0],
    };

    addListing(listing);
    setToast(`Listing posted! $${LISTING_FEE} listing fee processed.`);
    setTimeout(() => navigate('/browse'), 1800);
  };

  return (
    <MobileShell bg="bg-emoji" showNav={false}>
      <form className="form-page" onSubmit={handleSubmit}>
        <button type="button" className="back-btn" onClick={() => navigate('/browse')}>
          ← Back
        </button>
        <div className="eyebrow">SELL YOUR BUSINESS</div>
        <h1 className="page-title" style={{ marginBottom: 16 }}>Post listing</h1>

        <div className="fee-notice">
          <strong>Listing fee: ${LISTING_FEE}</strong> — Skip the broker commission. Pay once to list your Asian-owned business and reach qualified buyers nationwide. Premium upgrades coming soon.
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="title">Listing title</label>
          <input id="title" className="form-input" placeholder="e.g. Patel Motel — I-95 Corridor" value={form.title} onChange={update('title')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="businessName">Business name</label>
          <input id="businessName" className="form-input" value={form.businessName} onChange={update('businessName')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="type">Listing type</label>
          <select id="type" className="form-select" value={form.type} onChange={update('type')}>
            <option value="sell">Sell</option>
            <option value="buy">Buy (wanted)</option>
            <option value="lease">Lease</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="category">Category</label>
          <select id="category" className="form-select" value={form.category} onChange={update('category')}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="price">Price ($)</label>
          <input id="price" type="number" className="form-input" placeholder={form.type === 'lease' ? 'Monthly rent' : 'Asking price'} value={form.price} onChange={update('price')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="location">Location</label>
          <input id="location" className="form-input" placeholder="City, State" value={form.location} onChange={update('location')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea id="description" className="form-textarea" value={form.description} onChange={update('description')} required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Pay ${LISTING_FEE} & Post listing
          </button>
        </div>
      </form>
      <Toast message={toast} onDone={() => setToast('')} />
    </MobileShell>
  );
}
