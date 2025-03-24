import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Sidebar.css';

const Sidebar = ({ popularTags }) => {
  const navigate = useNavigate();

  const handleTagClick = (tagName) => {
    navigate(`/search?tag=${encodeURIComponent(tagName)}`);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-header">
          <h3>Popular Tags</h3>
          <a href="/tags" className="see-all-link">
            See All →
          </a>
        </div>
        
        <div className="tags-container">
          {popularTags.map((tag, index) => (
            <div 
              key={index} 
              className="tag-item"
              onClick={() => handleTagClick(tag.name)}
            >
              <span className="tag-name">{tag.name}</span>
              <span className="tag-count">{tag.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Trending Now</h3>
        <div className="trending-list">
          <div className="trending-item">UI Design Trends</div>
          <div className="trending-item">Campus Events</div>
          <div className="trending-item">Tech News</div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  popularTags: PropTypes.array
};

Sidebar.defaultProps = {
  popularTags: []
};

export default Sidebar;