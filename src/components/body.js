import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, fetchRepo, userSelector } from "../slices/user";
import {FallingLines} from'react-loader-spinner'
const Body = () => {
  const { profile, loading, hasErrors, repo } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { user } = useAuth0();

  useEffect(() => {
    const userKey = user.sub.match(/\d+/g);
    dispatch(fetchProfile(userKey));
    dispatch(fetchRepo(user.nickname));
  }, [dispatch, user.sub, user.nickname]);

  function generateHumanDate(dateString) {
    let today = new Date();
    let date = new Date(dateString);
    let diffSeconds = (today.getTime() - date.getTime()) / 1000;
    if (diffSeconds < 60) {
      return ` a few seconds ago`;
    }

    let diffMinutes = Math.round(
      (today.getTime() - date.getTime()) / (1000 * 60)
    );
    if (diffMinutes === 1) {
      return diffMinutes + " minute ago";
    }
    if (diffMinutes < 60) {
      return diffMinutes + " minutes ago";
    }

    let diffHours = Math.round(
      (today.getTime() - date.getTime()) / (1000 * 3600)
    );
    if (diffHours === 1) {
      return diffHours + " hour ago";
    }
    if (diffHours <= 24) {
      return diffHours + " hours ago";
    }

    let diffDays = Math.round(
      (today.getTime() - date.getTime()) / (1000 * 3600 * 24)
    );
    if (diffDays === 1) {
      return diffDays + " day ago";
    }
    if (diffDays <= 8) {
      return diffDays + " days ago";
    }

    if (diffDays < 365) {
      return (
        "on " +
        date.toLocaleString("default", { month: "short" }) +
        " " +
        date.getDate()
      );
    }

    let diffYears = Math.round(
      (today.getTime() - date.getTime()) / (1000 * 3600 * 24 * 365)
    );
    if (diffYears === 1) {
      return diffYears + " year ago";
    }

    return diffYears + " years ago";
  }

  if (loading) return <p className="loader"><FallingLines width="110" color="#c8553d" /></p>;
  if (hasErrors) return <p>Cannot display profile...</p>;
  return (
    <div className="content-container padding-horizontal-lg">
      <div className="content-body">
        <div className="width-25 width-sm-100 padding-horizontal profile-area">
          <div className="width-100 img-name-area">
            <div className="width-100 width-sm-16 img-area">
              <a className="image-holder" href="https://github.com/account">
                <img
                  className="profile-image"
                  src={profile.avatar_url}
                  alt="profile"
                />
              </a>
              <span className="user-status display-sm-none">
                <span className="user-status-emoji-holder">
                  {" "}
                  <div>
                    <g-emoji
                      className="g-emoji"
                      alias="computer"
                      fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f4bb.png"
                    >
                      💻
                    </g-emoji>
                  </div>
                </span>
              </span>
            </div>
            <div className="width-100 width-sm-75 name-area">
              <h3 id="spy-profile-view">
                <p className="fullname-text">{profile.name}</p>
                <p className="username-text">{profile.login}</p>
              </h3>
            </div>
          </div>
          <div className="width-100 bio-area">
            <p className="bio" id="bio">
              {profile.bio}
            </p>
          </div>

          <div className="width-100 edit-profile-area">
            <button className="button width-100">Edit Profile</button>
          </div>
          <div className="width-100 network-info-area">
            <span className="info-item">
              <svg
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"
                ></path>
              </svg>
              <strong id="followers-count">{profile.followers}</strong>
              followers
            </span>
            ·
            <span className="info-item">
              <strong id="following-count">{profile.following}</strong>
              following
            </span>
          </div>
          <div className="width-100 contact-area">
            <ul className="contact-list">
              <li className="contact-location">
                <svg
                  className="octicon octicon-location"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"
                  ></path>
                </svg>
                {profile.location}
              </li>
              <li className="contact-email">
                <svg
                  className="octicon octicon-mail"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"
                  ></path>
                </svg>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li className="contact-website">
                <svg
                  className="octicon octicon-link"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                  ></path>
                </svg>
                <a href="https://https://linkedin.com/in/fanan-dala">
                  {profile.blog}
                </a>
              </li>
              <li className="contact-twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 273.5 222.3"
                  className="octicon"
                >
                  <path d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"></path>
                </svg>
                <a href="https://twitter.com/the_cocoreidh">
                  {profile.twitter_username}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="width-75 width-sm-100 padding-horizontal repo-area">
          <div className="repo-filter-container width-100 padding-vertical">
            <div className="search-input-holder">
              <input placeholder="Find a repository..." className="width-100" />
            </div>

            <div className="buttons-holder">
              <button className="button">
                <span className="category">Type:</span> All
                <span className="dropdown-icon"></span>
              </button>
              <button className="button">
                <span className="category">Language:</span> All
                <span className="dropdown-icon"></span>
              </button>
              <button className="button button-green">
                <svg
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                  ></path>
                </svg>
                New
              </button>
            </div>
          </div>
          <div className="repositories-list" id="repositories-list">
            {repo.map((repo) => (
              <div
                className="repository-main padding-vertical-md"
                key={repo.id}
              >
                <div className="width-75">
                  <h3>
                    <a href="https://github.com/the-fanan/go-machine-learning">
                      {repo.name}
                    </a>
                  </h3>
                  <p className="description">{repo.description} </p>
                  <div className="info">
                    {repo.language === null ? (
                      ""
                    ) : (
                      <span className="info-item  language-info">
                        <span className="language-color"></span>
                        {repo.language}
                      </span>
                    )}

                    {repo.stargazers_count <= 0 ? (
                      ""
                    ) : (
                      <span className="info-item">
                        <a href="https://github.com/">
                          <svg
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                            height="16"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                            ></path>
                          </svg>
                          {repo.stargazers_count}
                        </a>{" "}
                      </span>
                    )}

                    {repo.forks_count <= 0 ? (
                      ""
                    ) : (
                      <span className="info-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          width="16"
                          height="16"
                          aria-hidden="true"
                        >
                          <path d="M160 80C160 112.8 140.3 140.1 112 153.3V192C112 209.7 126.3 224 144 224H304C321.7 224 336 209.7 336 192V153.3C307.7 140.1 288 112.8 288 80C288 35.82 323.8 0 368 0C412.2 0 448 35.82 448 80C448 112.8 428.3 140.1 400 153.3V192C400 245 357 288 304 288H256V358.7C284.3 371 304 399.2 304 432C304 476.2 268.2 512 224 512C179.8 512 144 476.2 144 432C144 399.2 163.7 371 192 358.7V288H144C90.98 288 48 245 48 192V153.3C19.75 140.1 0 112.8 0 80C0 35.82 35.82 0 80 0C124.2 0 160 35.82 160 80V80zM80 104C93.25 104 104 93.25 104 80C104 66.75 93.25 56 80 56C66.75 56 56 66.75 56 80C56 93.25 66.75 104 80 104zM368 104C381.3 104 392 93.25 392 80C392 66.75 381.3 56 368 56C354.7 56 344 66.75 344 80C344 93.25 354.7 104 368 104zM224 408C210.7 408 200 418.7 200 432C200 445.3 210.7 456 224 456C237.3 456 248 445.3 248 432C248 418.7 237.3 408 224 408z" />
                        </svg>
                        <a href="https://github.com/">{repo.forks_count}</a>{" "}
                      </span>
                    )}
                    <span className="info-item">
                      Updated {generateHumanDate(repo.updated_at)}
                    </span>
                  </div>
                </div>
                <div className="width-25 star-button-holder">
                  <button className="button">
                    <svg
                      viewBox="0 0 16 16"
                      version="1.1"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
                      ></path>
                    </svg>
                    Unstar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Body;
