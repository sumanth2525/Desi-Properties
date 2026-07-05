import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileShell from '../components/MobileShell';
import Toast from '../components/Toast';
import {
  getListingById,
  getUser,
  isProfileComplete,
  addInquiry,
  toggleSaved,
  isSaved,
  toggleUpvote,
  hasUpvoted,
} from '../store/storage';
import { getAvatarColor, getInitial, formatPrice } from '../data/seedListings';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = getListingById(id);
  const user = getUser();
  const [refresh, setRefresh] = useState(0);
  const [toast, setToast] = useState('');

  if (!listing) {
    return (
      <MobileShell showNav={false}>
        <div className="empty-state">
          <div className="empty-title">Listing not found</div>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/browse')}>
            Back to browse
          </button>
        </div>
      </MobileShell>
    );
  }

  void refresh;
  const profileComplete = isProfileComplete(user);
  const saved = isSaved(listing.id);
  const upvoted = hasUpvoted(listing.id);

  const handleInquire = () => {
    if (!profileComplete) {
      setToast('Complete your profile to contact the seller');
      setTimeout(() => navigate('/profile/edit'), 1500);
      return;
    }

    addInquiry({
      id: `inq-${Date.now()}`,
      listingId: listing.id,
      listingTitle: listing.title,
      buyerId: user.id,
      buyerName: user.name,
      buyerEmail: user.email,
      buyerPhone: user.phone,
      sellerId: listing.ownerId,
      sellerName: listing.ownerName,
      createdAt: new Date().toISOString(),
    });

    setToast('Inquiry sent! Seller contact info is now visible.');
    setRefresh((r) => r + 1);
  };

  return (
    <MobileShell showNav={false}>
      <div className="detail-page">
        <div className="detail-hero">
          <button type="button" className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className="eyebrow">{listing.category.toUpperCase()} · {listing.type.toUpperCase()}</div>
          <h1 className="page-title">{listing.title}</h1>
          <div className="detail-tags">
            {listing.tags?.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
            <div className="avatar" style={{ background: getAvatarColor(listing.businessName) }}>
              {getInitial(listing.businessName)}
            </div>
            <div>
              <div className="listing-name">{listing.businessName}</div>
              <div className="listing-desc">{listing.location}</div>
            </div>
            <span className="price-tag" style={{ marginLeft: 'auto' }}>
              {formatPrice(listing.price, listing.priceLabel || '')}
            </span>
          </div>
        </div>

        <p className="detail-desc">{listing.description}</p>

        <div className="detail-section">
          <div className="detail-section-title">Seller Contact</div>
          {profileComplete ? (
            <div className="contact-card">
              <div className="contact-row">
                <span className="contact-label">Name</span>
                <span className="contact-value">{listing.ownerName}</span>
              </div>
              <div className="contact-row">
                <span className="contact-label">Phone</span>
                <span className="contact-value">{listing.ownerPhone}</span>
              </div>
              <div className="contact-row">
                <span className="contact-label">Email</span>
                <span className="contact-value">{listing.ownerEmail}</span>
              </div>
            </div>
          ) : (
            <div className="contact-card contact-locked">
              Complete your profile to unlock seller contact details. Both parties must have full profiles before connecting.
            </div>
          )}
        </div>
      </div>

      <div className="detail-footer no-nav">
        <button
          type="button"
          className={`upvote-box ${upvoted ? 'active' : ''}`}
          style={{ flexDirection: 'row', gap: 6, padding: '12px 16px' }}
          onClick={() => { toggleUpvote(listing.id); setRefresh((r) => r + 1); }}
        >
          <span className="upvote-arrow">▲</span>
          <span className="upvote-count">{listing.upvotes}</span>
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => { toggleSaved(listing.id); setRefresh((r) => r + 1); }}
        >
          {saved ? 'Saved ✓' : 'Save'}
        </button>
        <button type="button" className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={handleInquire}>
          Contact Seller
        </button>
      </div>

      <Toast message={toast} onDone={() => setToast('')} />
    </MobileShell>
  );
}
