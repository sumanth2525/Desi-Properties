import { useNavigate } from 'react-router-dom';
import MobileShell from '../components/MobileShell';
import { getInquiries, getUser, getListingById } from '../store/storage';
import { formatPrice } from '../data/seedListings';

export default function MessagesPage() {
  const navigate = useNavigate();
  const user = getUser();
  const inquiries = getInquiries().filter((i) => i.buyerId === user?.id);

  return (
    <MobileShell>
      <div className="page-header">
        <div className="page-header-left">
          <div className="eyebrow">YOUR MESSAGES</div>
          <h1 className="page-title">Messages</h1>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <div className="empty-title">No messages yet</div>
          <div className="empty-desc">
            When you contact a seller, your conversations will show up here.
          </div>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/browse')}>
            Browse businesses
          </button>
        </div>
      ) : (
        <div className="page-body">
          <div className="listing-list">
            {inquiries.map((inq) => {
              const listing = getListingById(inq.listingId);
              return (
                <button
                  key={inq.id}
                  type="button"
                  className="listing-item"
                  style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                  onClick={() => navigate(`/listing/${inq.listingId}`)}
                >
                  <div className="listing-info">
                    <div className="listing-name">{inq.listingTitle}</div>
                    <div className="listing-desc">Seller: {inq.sellerName}</div>
                    <div className="listing-meta">
                      {listing ? formatPrice(listing.price, listing.priceLabel || '') : ''} · {new Date(inq.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span className="menu-chevron">›</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </MobileShell>
  );
}
