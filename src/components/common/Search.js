import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Styles } from "./styles/search.js";

const Search = () => {
  let history = useHistory();

  useEffect(() => {
    const searchTrigger = document.getElementById("search-trigger");
    const searchOverlay = document.getElementById("search-overlay");
    const searchWrap = document.getElementById("search-wrap");
    const searchExit = document.getElementById("search-close");

    if (searchTrigger) {
      searchTrigger.addEventListener("click", function (e) {
        e.preventDefault();
        searchWrap.classList.add("active");
      });

      searchOverlay.addEventListener("click", function (e) {
        e.preventDefault();
        searchWrap.classList.remove("active");
      });

      searchExit.addEventListener("click", function (e) {
        e.preventDefault();
        searchWrap.classList.remove("active");
      });
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const searchVal = document.getElementById("search")?.value;
    const searchWrap = document.getElementById("search-wrap");

    if (searchVal.length > 0) {
      searchWrap.classList.remove("active");
      history.push(`/courses?search=${searchVal}`);
    } else {
      searchWrap.classList.remove("active");
    }
  };

  return (
    <Styles>
      {/* Search Box */}
      <a
        href={process.env.PUBLIC_URL + "/"}
        className="nav-link nav-search"
        id="search-trigger"
      >
        <i className="las la-search"></i>
      </a>
      {/* Fullscreen search */}
      <div className="search-wrap" id="search-wrap">
        <div
          className="search-overlay custom-overlay"
          id="search-overlay"
        ></div>
        <div className="search-inner">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Type and hit enter...."
            />
            <i className="las la-times close-btn" id="search-close"></i>
          </form>
        </div>
      </div>
    </Styles>
  );
};

export default Search;
