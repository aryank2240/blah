import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';

// Temporary placeholders for other pages
const SingleBlog = () => <div>Single Blog Page</div>;
const Profile = () => <div>Profile Page</div>;
const Search = () => <div>Search Page</div>;
const Write = () => <div>Write Blog Page</div>;
const Settings = () => <div>Settings Page</div>;

// Admin route guard
const AdminRoute = ({ element }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? element : <Navigate to="/" />;
};

// Home route guard - redirects admin users to admin page
const HomeRoute = ({ element }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? <Navigate to="/admin" /> : element;
};

const App = () => (
  <Router>
    <Routes>
      {/* Main routes */}
      <Route path="/" element={<HomeRoute element={<Home />} />} />
      <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
      
      {/* Other routes */}
      <Route path="/blog/:id" element={<SingleBlog />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/write" element={<Write />} />
      <Route path="/settings" element={<Settings />} />
      
      {/* Catch all route - redirects to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default App;