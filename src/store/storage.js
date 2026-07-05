import { SEED_LISTINGS } from '../data/seedListings';

const KEYS = {
  user: 'desi_user',
  listings: 'desi_listings',
  inquiries: 'desi_inquiries',
  upvotes: 'desi_upvotes',
  saved: 'desi_saved',
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getUser() {
  return read(KEYS.user, null);
}

export function setUser(user) {
  write(KEYS.user, user);
}

export function logout() {
  localStorage.removeItem(KEYS.user);
}

export function isProfileComplete(user) {
  if (!user) return false;
  return Boolean(
    user.name?.trim() &&
    user.email?.trim() &&
    user.phone?.trim() &&
    user.role?.trim() &&
    user.location?.trim()
  );
}

export function getListings() {
  const stored = read(KEYS.listings, null);
  if (!stored) {
    write(KEYS.listings, SEED_LISTINGS);
    return SEED_LISTINGS;
  }
  return stored;
}

export function addListing(listing) {
  const listings = getListings();
  const updated = [listing, ...listings];
  write(KEYS.listings, updated);
  return updated;
}

export function getListingById(id) {
  return getListings().find((l) => l.id === id);
}

export function getUpvotes() {
  return read(KEYS.upvotes, []);
}

export function toggleUpvote(listingId) {
  const upvotes = getUpvotes();
  const idx = upvotes.indexOf(listingId);
  if (idx >= 0) upvotes.splice(idx, 1);
  else upvotes.push(listingId);

  write(KEYS.upvotes, upvotes);

  const listings = getListings().map((l) => {
    if (l.id !== listingId) return l;
    return { ...l, upvotes: l.upvotes + (idx >= 0 ? -1 : 1) };
  });
  write(KEYS.listings, listings);
  return upvotes;
}

export function hasUpvoted(listingId) {
  return getUpvotes().includes(listingId);
}

export function getInquiries() {
  return read(KEYS.inquiries, []);
}

export function addInquiry(inquiry) {
  const inquiries = getInquiries();
  const updated = [inquiry, ...inquiries];
  write(KEYS.inquiries, updated);
  return updated;
}

export function getSaved() {
  return read(KEYS.saved, []);
}

export function toggleSaved(listingId) {
  const saved = getSaved();
  const idx = saved.indexOf(listingId);
  if (idx >= 0) saved.splice(idx, 1);
  else saved.push(listingId);
  write(KEYS.saved, saved);
  return saved;
}

export function isSaved(listingId) {
  return getSaved().includes(listingId);
}

export function getUserStats(userId) {
  const listings = getListings();
  const inquiries = getInquiries();
  const upvotes = getUpvotes();

  return {
    messages: inquiries.filter((i) => i.buyerId === userId).length,
    posted: listings.filter((l) => l.ownerId === userId).length,
    upvoted: upvotes.length,
  };
}

export function createMockLogin(provider) {
  const names = {
    google: 'Alex Rivera',
    apple: 'Priya Shah',
    linkedin: 'Imran Khan',
    email: 'Guest User',
  };
  const id = `user-${Date.now()}`;
  return {
    id,
    name: names[provider] || 'Guest User',
    email: '',
    phone: '',
    role: '',
    location: '',
    provider,
    createdAt: new Date().toISOString(),
  };
}
