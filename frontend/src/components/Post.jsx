"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/post.module.scss";
import Image from "next/image";
import Comment from "./Comment";

const Post = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, SetCount] = useState({
    like: 222,
    iDidIt: 0,
    iWillDoIt: 0,
  });
  console.log(post);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClick = (e) => {
    if (e.target.id === "like") {
      SetCount((prevState) => ({ ...prevState, like: prevState.like + 1 }));
    } else if (e.target.id === "iDidIt") {
      SetCount((prevState) => ({ ...prevState, iDidIt: prevState.iDidIt + 1 }));
    } else if (e.target.id === "iWillDoIt") {
      SetCount((prevState) => ({
        ...prevState,
        iWillDoIt: prevState.iWillDoIt + 1,
      }));
    }
  };
  return (
    <div className={styles.container}>
      {/* header */}
      <div className={styles.header}>
        <div className={styles.user}>
          <div className={styles.image}>
            <Image
              src={post.owner.profile_pic}
              width={50}
              height={50}
              alt="Picture of the user"
            />
          </div>
          <h4
            className={styles.username}
          >{`${post.owner.first_name} ${post.owner.last_name}`}</h4>
          <div className={styles.time}>{post.created_at}</div>
        </div>
        {/* dropdown */}
        <div className={styles.dropdown}>
          <div className={styles.dropdownToggle} onClick={toggleDropdown}>
            <Image src="/dropDown.svg" width={30} height={30} alt="dropdown" />
          </div>
          {isOpen && (
            <div className={`${styles.dropdownMenu} ${isOpen ? "show" : ""}`}>
              <a href="#">Delete</a>
              <a href="#">Edit</a>
            </div>
          )}
        </div>
      </div>
      {/* Post Content */}
      <div className={styles.content}>
        <p>{post.content}</p>
        <div className={styles.image}>
          {post.image && <img src={post.image} alt="post image" />}
        </div>
      </div>
      {/* Buttons */}
      <div className={styles.actions}>
        <button className={styles.like} id="like" onClick={handleClick}>
          Like<span>{count.like}</span>
        </button>
        <button className={styles.iDidIt} id="iDidIt" onClick={handleClick}>
          I did it!<span>{count.iDidIt}</span>
        </button>
        <button
          className={styles.iWillDoIt}
          id="iWillDoIt"
          onClick={handleClick}
        >
          I will do it<span>{count.iWillDoIt}</span>
        </button>
        <button className={styles.share}>Share</button>
      </div>
      {/* Comments */}
      <input
        className={styles.writeComment}
        type="text"
        placeholder="Write a comment ..."
      />
      <div className={styles.comments}>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
};

export default Post;
