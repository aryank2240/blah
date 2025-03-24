import React, { useState, useEffect } from 'react';
import { FiSearch, FiBell, FiBookmark, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Blog from '../../components/Blog/Blog';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getBlogs, getVotes, getComments, isBlogSaved, saveBlog, unsaveBlog, getReports } from '../../services/api';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('forYou');
  const [viewMode, setViewMode] = useState('default');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogs();
        // Enhance blog data with local storage features
        const enhancedBlogs = response.data.map(blog => ({
          ...blog,
          votes: getVotes(blog.id),
          comments: getComments(blog.id),
          reports: getReports(blog.id),
          isSaved: isBlogSaved(blog.id),
          author: blog.author || 'Anonymous',
          role: blog.role || 'Student',
          tags: blog.tags || [],
          time: blog.time || 'Just now'
        }));
        setBlogs(enhancedBlogs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSaveToggle = (blogId) => {
    const isSaved = isBlogSaved(blogId);
    if (isSaved) {
      unsaveBlog(blogId);
    } else {
      saveBlog(blogId);
    }
    // Refresh the page to show updated state
    window.location.reload();
  };

  const getPageTitle = () => {
    switch (viewMode) {
      case 'saved':
        return 'Saved Blogs';
      case 'reported':
        return 'Reported';
      default:
        return activeTab === 'forYou' ? 'For You' : 'Following';
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    if (viewMode === 'saved') {
      return blog.isSaved;
    }
    if (viewMode === 'reported') {
      return blog.reports.length > 0;
    }
    return true;
  });

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header-content">
        <div className="header-main-row">
          <div className="search-add-container">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search for blogs, friends, tags"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-button" onClick={handleSearch}>
                <FiSearch className="search-icon" />
              </button>
            </div>
          </div>

          <div className="header-right">
            <button className="add-blog-button" onClick={() => navigate('/write')}>
              Add New Blog +
            </button>

            <div className="header-icons">
              <button 
                className={`icon-button ${viewMode === 'saved' ? 'active' : ''}`}
                onClick={() => setViewMode(prev => prev === 'saved' ? 'default' : 'saved')}
              >
                <FiBookmark />
              </button>
              <button 
                className={`icon-button ${viewMode === 'reported' ? 'active' : ''}`}
                onClick={() => setViewMode(prev => prev === 'reported' ? 'default' : 'reported')}
              >
                <FiBell />
                {viewMode !== 'reported' && blogs.some(blog => blog.reports.length > 0) && (
                  <span className="report-badge">!</span>
                )}
              </button>
              <button className="icon-button" onClick={() => navigate('/settings')}>
                <FiSettings />
              </button>
              <button className="icon-button" onClick={() => navigate('/profile')}>
                <img 
                  src="https://via.placeholder.com/40" 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        {viewMode === 'default' && (
          <div className="navigation-tabs">
            <button
              className={`tab-button ${activeTab === 'forYou' ? 'active' : ''}`}
              onClick={() => setActiveTab('forYou')}
            >
              For You
            </button>
            <button
              className={`tab-button ${activeTab === 'following' ? 'active' : ''}`}
              onClick={() => setActiveTab('following')}
            >
              Following
            </button>
          </div>
        )}

        {/* Single Tab for Saved/Reported Views */}
        {viewMode !== 'default' && (
          <div className="navigation-tabs">
            <div className="tab-button active">
              {getPageTitle()}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="main-content-container">
        <div className="feed-column">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="blog-wrapper">
              <Blog blog={blog} onSaveToggle={handleSaveToggle} />
              {viewMode === 'reported' && blog.reports.length > 0 && (
                <div className="blog-actions">
                  <span className="report-count">Reported {blog.reports.length} Times</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <Sidebar popularTags={[
          { name: "Campus", count: "112 blogs" },
          { name: "Events", count: "109 blogs" },
          { name: "Sports", count: "87 blogs" },
          { name: "Lost&Found", count: "84 blogs" },
          { name: "Buy&Sell", count: "78 blogs" }
        ]} />
      </div>
    </div>
  );
};

export default Home;