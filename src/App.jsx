import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from './store/storage';
import LoginPage from './pages/LoginPage';
import BrowsePage from './pages/BrowsePage';
import ListingDetailPage from './pages/ListingDetailPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import MessagesPage from './pages/MessagesPage';
import PostListingPage from './pages/PostListingPage';
import SavedPage from './pages/SavedPage';

function RequireAuth({ children }) {
  const user = getUser();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function GuestOnly({ children }) {
  const user = getUser();
  if (user) return <Navigate to="/browse" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestOnly><LoginPage /></GuestOnly>} />
      <Route path="/browse" element={<RequireAuth><BrowsePage /></RequireAuth>} />
      <Route path="/listing/:id" element={<RequireAuth><ListingDetailPage /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
      <Route path="/profile/edit" element={<RequireAuth><EditProfilePage /></RequireAuth>} />
      <Route path="/messages" element={<RequireAuth><MessagesPage /></RequireAuth>} />
      <Route path="/post" element={<RequireAuth><PostListingPage /></RequireAuth>} />
      <Route path="/saved" element={<RequireAuth><SavedPage /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
