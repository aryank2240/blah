import React, { useState } from "react";
import "../styles/ProfilePage.css";
import BlogCard from "../components/BlogCard";
import WriterSuggestion from "../components/WriterSuggestion";

const ProfilePage = () => {
  // ✅ State for Profile Information
  const [profile, setProfile] = useState({
    name: "X_AE_A_13",
    username: "@X_AE_A_13",
    blogsCount: 134,
    following: 67,
    followers: 47,
    profileImage: "https://i.pravatar.cc/150?img=3", // Replace with actual image URL
  });

  // ✅ State for Editing Mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  // ✅ State for Follow Button
  const [isFollowing, setIsFollowing] = useState(false);

  // ✅ Handle Edit Button Click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle Save Button Click
  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  // ✅ Handle Cancel Button Click
  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  // ✅ Handle Follow Button Click
  const handleFollowClick = () => {
    setIsFollowing((prev) => !prev);
    setProfile((prevProfile) => ({
      ...prevProfile,
      followers: prevProfile.followers + (isFollowing ? -1 : 1),
    }));
  };

  return (
    <div className="profile-container">
      {/* ✅ Search Bar with "Add New Blog +" */}
      <div className="search-bar">
        <input type="text" placeholder="Search for blogs, writers, tags" />
        <button className="add-blog-btn">+ Add New Blog</button>
      </div>

      {/* ✅ Main Content Layout */}
      <div className="main-content">
        {/* ✅ Left Section (Profile & Blogs) */}
        <div className="left-section">
          {/* ✅ Profile Section */}
          <div className="profile-section">
            <img src={profile.profileImage} alt="Profile" className="profile-image" />

            {/* ✅ If Editing, Show Input Fields */}
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleChange}
                  className="edit-input"
                />
                <input
                  type="text"
                  name="username"
                  value={editedProfile.username}
                  onChange={handleChange}
                  className="edit-input"
                />
              </>
            ) : (
              <>
                <h2>{profile.name}</h2>
                <p>{profile.username}</p>
              </>
            )}

            <p>{profile.blogsCount} Blogs</p>
            <div className="follow-info">
              <span>{profile.following} Following</span> | <span>{profile.followers} Followers</span>
            </div>

            {/* ✅ Conditional Buttons for Editing Mode */}
            {isEditing ? (
              <>
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                {/* ✅ Follow Button */}
                <button
                  className={`follow-btn ${isFollowing ? "following" : ""}`}
                  onClick={handleFollowClick}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </>
            )}
          </div>

          {/* ✅ Blogs Section */}
          <div className="blogs-section">
            <h3>Recent Blogs</h3>
            <BlogCard title="Fusion of Societies" content="Cultural fusion has become..." comments={25} />
            <BlogCard title="The Power of Writing" content="Writing allows us to express..." comments={18} />
          </div>
        </div>

        {/* ✅ Right Section (Writer Suggestions) */}
        <div className="right-section">
          <div className="writer-suggestions">
            <h3>Writer Suggestions</h3>
            <ul>
              <WriterSuggestion name="Julia Smith" username="@juliasmith" />
              <WriterSuggestion name="Vermillion D. Gray" username="@vermilliongray" />
              <WriterSuggestion name="Mai Senpai" username="@maisenpai" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
