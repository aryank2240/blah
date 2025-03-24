import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBookmark } from 'react-icons/fi';
import { toggleVote } from '../../services/api';
import './Blog.css';

const Blog = ({ blog, onSaveToggle }) => {
  const navigate = useNavigate();

  const handleVote = (type) => {
    toggleVote(blog.id, type);
    // Refresh the page to show updated votes
    window.location.reload();
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSaveToggle(blog.id);
  };

  return (
    <div className="blog-post" onClick={() => navigate(`/blog/${blog.id}`)}>
      <div className="author-info">
        <img src={blog.authorImage || 'https://via.placeholder.com/40'} alt={blog.author} />
        <div className="author-details">
          <h3 className="author-name">{blog.author}</h3>
          <p className="author-role">{blog.role}</p>
        </div>
        <div className="post-time">{blog.time}</div>
      </div>
      
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-content">{blog.content}</p>
      
      <div className="blog-footer">
        <div className="vote-section">
          <button 
            className="vote-button"
            onClick={(e) => {
              e.stopPropagation();
              handleVote('upvote');
            }}
          >
            ↑
          </button>
          <span className="vote-count">
            {(blog.votes?.upvotes || 0) - (blog.votes?.downvotes || 0)}
          </span>
          <button 
            className="vote-button"
            onClick={(e) => {
              e.stopPropagation();
              handleVote('downvote');
            }}
          >
            ↓
          </button>
        </div>
        <span className="blog-stats">
          <span>💬</span>
          <span>{blog.comments?.length || 0} Comments</span>
        </span>
        <div className="blog-tags">
          {blog.tags?.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <button 
          className={`save-button ${blog.isSaved ? 'saved' : ''}`}
          onClick={handleSave}
        >
          <FiBookmark />
        </button>
      </div>
    </div>
  );
};

export default Blog;