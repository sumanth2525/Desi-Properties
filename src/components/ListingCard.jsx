import { Link } from 'react-router-dom';
import { getAvatarColor, getInitial, formatPrice } from '../data/seedListings';
import { hasUpvoted, toggleUpvote } from '../store/storage';

export default function ListingCard({ listing, mode = 'compact', onUpvote, onInquire }) {
  const upvoted = hasUpvoted(listing.id);
  const color = getAvatarColor(listing.businessName);
  const initial = getInitial(listing.businessName);
  const priceLabel = listing.priceLabel || '';

  const handleUpvote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleUpvote(listing.id);
    onUpvote?.();
  };

  if (mode === 'compact') {
    return (
      <Link to={`/listing/${listing.id}`} className="listing-item">
        <div className="avatar" style={{ background: color }}>{initial}</div>
        <div className="listing-info">
          <div className="listing-name">
            {listing.title}
            {listing.verified && <span className="mini-badge verified">Verified</span>}
          </div>
          <div className="listing-desc">{listing.description}</div>
          <div className="listing-meta">{listing.category} · {listing.location}</div>
        </div>
        <div className="listing-action">
          <button
            type="button"
            className={`upvote-box ${upvoted ? 'active' : ''}`}
            onClick={handleUpvote}
            aria-label="Upvote"
          >
            <span className="upvote-arrow">▲</span>
            <span className="upvote-count">{listing.upvotes}</span>
          </button>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/listing/${listing.id}`} className="listing-item">
      <div className="avatar" style={{ background: color }}>{initial}</div>
      <div className="listing-info">
        <div className="listing-name">
          {listing.title}
          {listing.verified && <span className="mini-badge verified">Verified</span>}
        </div>
        <div className="listing-desc">{listing.businessName} · {listing.location}</div>
        <div className="listing-meta">{listing.tags?.slice(0, 2).join(' · ')}</div>
      </div>
      <div className="listing-action">
        <span className="price-tag">{formatPrice(listing.price, priceLabel)}</span>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onInquire?.(listing);
          }}
        >
          Inquire
        </button>
      </div>
    </Link>
  );
}
