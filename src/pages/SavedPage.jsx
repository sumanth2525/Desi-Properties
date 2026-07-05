import { useNavigate } from 'react-router-dom';
import MobileShell from '../components/MobileShell';
import ListingCard from '../components/ListingCard';
import { getListings, getSaved } from '../store/storage';

export default function SavedPage() {
  const navigate = useNavigate();
  const savedIds = getSaved();
  const listings = getListings().filter((l) => savedIds.includes(l.id));

  return (
    <MobileShell bg="bg-dots" showNav={false}>
      <div className="page-header">
        <button type="button" className="back-btn" onClick={() => navigate('/profile')}>
          ← Back
        </button>
        <div className="page-header-left">
          <div className="eyebrow">SAVED</div>
          <h1 className="page-title">Listings</h1>
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">♡</div>
          <div className="empty-title">No saved listings</div>
          <div className="empty-desc">Save businesses you're interested in to review later.</div>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/browse')}>
            Browse businesses
          </button>
        </div>
      ) : (
        <div className="page-body">
          <div className="listing-list">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} mode="detailed" />
            ))}
          </div>
        </div>
      )}
    </MobileShell>
  );
}
