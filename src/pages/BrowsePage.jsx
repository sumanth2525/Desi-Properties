import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileShell from '../components/MobileShell';
import SegmentToggle from '../components/SegmentToggle';
import ListingCard from '../components/ListingCard';
import ListingsMap from '../components/ListingsMap';
import Toast from '../components/Toast';
import { getListings } from '../store/storage';

const TYPE_OPTIONS = [
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
  { value: 'lease', label: 'Lease' },
];

export default function BrowsePage() {
  const navigate = useNavigate();
  const [listType, setListType] = useState('buy');
  const [viewMode, setViewMode] = useState('list');
  const [activeFilter, setActiveFilter] = useState('all');
  const [refresh, setRefresh] = useState(0);
  const [toast, setToast] = useState('');

  const typeListings = useMemo(() => {
    void refresh;
    return getListings().filter((l) => l.type === listType);
  }, [listType, refresh]);

  const categories = useMemo(() => {
    return [...new Set(typeListings.map((l) => l.category))];
  }, [typeListings]);

  const filterChips = useMemo(() => {
    return [
      { id: 'all', label: 'All types' },
      ...categories.map((c) => ({ id: c, label: c })),
      { id: 'verified', label: 'Verified' },
    ];
  }, [categories]);

  const listings = useMemo(() => {
    if (activeFilter === 'all') return typeListings;
    if (activeFilter === 'verified') return typeListings.filter((l) => l.verified);
    return typeListings.filter((l) => l.category === activeFilter);
  }, [typeListings, activeFilter]);

  const handleListTypeChange = (type) => {
    setListType(type);
    setActiveFilter('all');
  };

  const headerLabels = {
    buy: { eyebrow: 'FOR SALE', title: 'Buy' },
    sell: { eyebrow: 'TRENDING TODAY', title: 'Businesses' },
    lease: { eyebrow: 'ALL LISTINGS', title: 'Lease' },
  };

  const { eyebrow, title } = headerLabels[listType];

  return (
    <MobileShell>
      <div className="page-header">
        <div className="page-header-left">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="page-title">{title}</h1>
        </div>
        <button type="button" className="btn btn-ghost" onClick={() => navigate('/post')}>
          + Post
        </button>
      </div>

      <SegmentToggle options={TYPE_OPTIONS} value={listType} onChange={handleListTypeChange} />

      <div className="summary-line">
        {listings.length} LISTINGS · {categories.length} TYPES
      </div>

      <div className="filter-scroll">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className={`chip ${chip.id === 'verified' ? 'verified' : ''} ${activeFilter === chip.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="map-toggle">
        <button
          type="button"
          className={`map-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          List
        </button>
        <button
          type="button"
          className={`map-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
          onClick={() => setViewMode('map')}
        >
          Map
        </button>
      </div>

      {viewMode === 'map' && (
        <ListingsMap
          listings={listings}
          onSelect={(id) => navigate(`/listing/${id}`)}
        />
      )}

      <div className="page-body">
        <div className="listing-list">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              mode={listType === 'sell' ? 'compact' : 'detailed'}
              onUpvote={() => setRefresh((r) => r + 1)}
              onInquire={() => navigate(`/listing/${listing.id}`)}
            />
          ))}
          {listings.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🏢</div>
              <div className="empty-title">No listings yet</div>
              <div className="empty-desc">Be the first to post an Asian-owned business in this category.</div>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/post')}>
                Post a listing
              </button>
            </div>
          )}
        </div>
      </div>

      <Toast message={toast} onDone={() => setToast('')} />
    </MobileShell>
  );
}
